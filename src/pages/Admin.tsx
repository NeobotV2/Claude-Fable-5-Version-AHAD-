import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  auth, 
  db, 
  collection, 
  query, 
  orderBy, 
  limit,
  onSnapshot, 
  signInWithPopup, 
  googleProvider,
  signOut,
  onAuthStateChanged,
  FirebaseUser,
  Timestamp,
  doc,
  setDoc,
  serverTimestamp,
  writeBatch,
} from '@/firebase';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  LogIn, 
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Trash2,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { buildSemicolonCsv } from '@/lib/csv';

interface JobApplication {
  id: string;
  name: string;
  phone: string;
  jobType: string;
  department: string;
  experience: string;
  startDate: string;
  mobility: string;
  location: string;
  status: string;
  /** false = E-Mail-Benachrichtigung fehlgeschlagen — Eintrag existiert nur hier. */
  emailSent?: boolean;
  createdAt: Timestamp | null;
}

interface OfferLead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  objectType: string;
  services: string[];
  areaSize: string;
  frequency: string;
  status: string;
  emailSent?: boolean;
  createdAt: Timestamp | null;
}

interface ContactLead {
  id: string;
  contactPerson: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  status: string;
  emailSent?: boolean;
  createdAt: Timestamp | null;
}

/** Badge für Einträge, deren E-Mail-Benachrichtigung fehlschlug (nur Firestore). */
function EmailFailedBadge({ emailSent }: { emailSent?: boolean }) {
  if (emailSent !== false) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase">
      <AlertCircle size={12} />
      E-Mail fehlgeschlagen
    </span>
  );
}

/** CSV-Export (Semikolon + BOM → öffnet sauber in deutschem Excel). */
const asString = (value: unknown): string => typeof value === 'string' ? value : '';
const asBoolean = (value: unknown): boolean | undefined => typeof value === 'boolean' ? value : undefined;
const asStringArray = (value: unknown): string[] => Array.isArray(value)
  ? value.filter((item): item is string => typeof item === 'string').slice(0, 20)
  : [];
const asTimestamp = (value: unknown): Timestamp | null => value instanceof Timestamp ? value : null;

function formatTimestamp(value: Timestamp | null): string {
  if (!value) return 'Zeitpunkt unbekannt';
  try {
    const date = value.toDate();
    return Number.isNaN(date.getTime()) ? 'Zeitpunkt unbekannt' : date.toLocaleString('de-DE');
  } catch {
    return 'Zeitpunkt unbekannt';
  }
}

function normalizeJob(id: string, data: Record<string, unknown>): JobApplication {
  return {
    id,
    name: asString(data.name), phone: asString(data.phone), jobType: asString(data.jobType),
    department: asString(data.department), experience: asString(data.experience), startDate: asString(data.startDate),
    mobility: asString(data.mobility), location: asString(data.location), status: asString(data.status) || 'new',
    emailSent: asBoolean(data.emailSent), createdAt: asTimestamp(data.createdAt),
  };
}

function normalizeOffer(id: string, data: Record<string, unknown>): OfferLead {
  return {
    id,
    companyName: asString(data.companyName), contactPerson: asString(data.contactPerson), email: asString(data.email),
    phone: asString(data.phone), location: asString(data.location), objectType: asString(data.objectType),
    services: asStringArray(data.services), areaSize: asString(data.areaSize), frequency: asString(data.frequency),
    status: asString(data.status) || 'new', emailSent: asBoolean(data.emailSent), createdAt: asTimestamp(data.createdAt),
  };
}

function normalizeContact(id: string, data: Record<string, unknown>): ContactLead {
  return {
    id,
    contactPerson: asString(data.contactPerson), company: asString(data.company), email: asString(data.email),
    phone: asString(data.phone), serviceType: asString(data.serviceType), message: asString(data.message),
    status: asString(data.status) || 'new', emailSent: asBoolean(data.emailSent), createdAt: asTimestamp(data.createdAt),
  };
}

function downloadCsv(filename: string, columns: readonly string[], rows: readonly (readonly unknown[])[]) {
  if (rows.length === 0) return;
  const csv = buildSemicolonCsv(columns, rows);
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [offerLeads, setOfferLeads] = useState<OfferLead[]>([]);
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'offers' | 'contacts'>('jobs');
  const [dataError, setDataError] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  useEffect(() => {
    // Zugriffsschutz liegt bewusst NICHT im Client: Welche Konten lesen dürfen,
    // entscheiden allein die Firestore-Sicherheitsregeln (siehe firestore.rules).
    // Nicht autorisierte Logins sehen ein leeres Dashboard, keine Daten.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const reportListenerError = (collectionName: string) => (error: unknown) => {
      console.error(`Admin listener failed: ${collectionName}`, error);
      setDataError('Die Datensätze konnten nicht geladen werden. Bitte Berechtigung und Verbindung prüfen.');
    };

    const unsubJobs = onSnapshot(
      query(collection(db, 'job_applications'), orderBy('createdAt', 'desc'), limit(100)),
      (snapshot) => {
        setDataError(null);
        setJobApplications(snapshot.docs.map((snapshotDoc) => normalizeJob(snapshotDoc.id, snapshotDoc.data())));
      },
      reportListenerError('job_applications'),
    );

    const unsubOffers = onSnapshot(
      query(collection(db, 'offer_leads'), orderBy('createdAt', 'desc'), limit(100)),
      (snapshot) => {
        setDataError(null);
        setOfferLeads(snapshot.docs.map((snapshotDoc) => normalizeOffer(snapshotDoc.id, snapshotDoc.data())));
      },
      reportListenerError('offer_leads'),
    );

    const unsubContacts = onSnapshot(
      query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(100)),
      (snapshot) => {
        setDataError(null);
        setContactLeads(snapshot.docs.map((snapshotDoc) => normalizeContact(snapshotDoc.id, snapshotDoc.data())));
      },
      reportListenerError('leads'),
    );

    return () => {
      unsubJobs();
      unsubOffers();
      unsubContacts();
    };
  }, [user]);

  const updateStatus = async (collectionName: string, id: string, newStatus: string) => {
    const statusByCollection: Record<string, readonly string[]> = {
      leads: ['new', 'contacted', 'closed'],
      offer_leads: ['new', 'contacted', 'visited', 'offered', 'closed'],
      job_applications: ['new', 'reviewed', 'contacted', 'rejected', 'hired'],
    };
    if (!statusByCollection[collectionName]?.includes(newStatus)) return;
    const terminal = ['closed', 'rejected', 'hired'].includes(newStatus);
    const retentionDays = terminal ? (collectionName === 'job_applications' ? 180 : 90) : 365;
    try {
      await setDoc(doc(db, collectionName, id), {
        status: newStatus,
        updatedAt: serverTimestamp(),
        expiresAt: Timestamp.fromDate(new Date(Date.now() + retentionDays * 86_400_000)),
      }, { merge: true });
    } catch (err) {
      console.error(`Error updating status in ${collectionName}:`, err);
      setDataError('Der Status konnte nicht gespeichert werden.');
    }
  };

  const deleteRecord = async (collectionName: string, id: string, label: string) => {
    if (!user || !window.confirm(`„${label || 'Datensatz'}“ dauerhaft löschen? Dieser Vorgang wird protokolliert.`)) return;
    const key = `${collectionName}/${id}`;
    setDeletingKey(key);
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, collectionName, id));
      batch.set(doc(collection(db, 'admin_audit_logs')), {
        action: 'delete',
        collection: collectionName,
        recordId: id,
        actorUid: user.uid,
        actorEmail: user.email ?? '',
        createdAt: serverTimestamp(),
      });
      await batch.commit();
    } catch (error) {
      console.error('Admin deletion failed', error);
      setDataError('Der Datensatz konnte nicht gelöscht werden.');
    } finally {
      setDeletingKey(null);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D6B38]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <SEO title="Admin Login | AHAD Cleaning" description="Admin Bereich für AHAD Cleaning." noindex />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-blue-50 text-[#0B2341] rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-2xl font-black text-[#0B2341] mb-4">Admin Dashboard</h1>
          <p className="text-[#424751] mb-8">
            Bitte melden Sie sich mit Ihrem autorisierten Google-Konto an, um auf die Anfragen zuzugreifen.
          </p>
          <button 
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            <LogIn size={20} /> Mit Google anmelden
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] pt-32 pb-20 lg:pt-40 lg:pb-32 px-4">
      <SEO title="Admin Dashboard | AHAD Cleaning" description="Verwaltung von Bewerbungen und Angeboten." noindex />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black text-[#0B2341] mb-2">Dashboard</h1>
            <p className="text-[#424751]">Willkommen zurück, {user.displayName}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                const stamp = new Date().toISOString().slice(0, 10);
                if (activeTab === 'jobs') downloadCsv(
                  `bewerbungen-${stamp}.csv`,
                  ['ID', 'Name', 'Telefon', 'Stelle', 'Bereich', 'Erfahrung', 'Start', 'Mobilität', 'Standort', 'Status', 'E-Mail gesendet', 'Erstellt'],
                  jobApplications.map((item) => [item.id, item.name, item.phone, item.jobType, item.department, item.experience, item.startDate, item.mobility, item.location, item.status, item.emailSent === true ? 'Ja' : 'Nein', formatTimestamp(item.createdAt)]),
                );
                if (activeTab === 'offers') downloadCsv(
                  `angebotsanfragen-${stamp}.csv`,
                  ['ID', 'Firma', 'Kontakt', 'E-Mail', 'Telefon', 'Standort', 'Objekt', 'Leistungen', 'Fläche', 'Intervall', 'Status', 'E-Mail gesendet', 'Erstellt'],
                  offerLeads.map((item) => [item.id, item.companyName, item.contactPerson, item.email, item.phone, item.location, item.objectType, item.services, item.areaSize, item.frequency, item.status, item.emailSent === true ? 'Ja' : 'Nein', formatTimestamp(item.createdAt)]),
                );
                if (activeTab === 'contacts') downloadCsv(
                  `kontaktanfragen-${stamp}.csv`,
                  ['ID', 'Kontakt', 'Firma', 'E-Mail', 'Telefon', 'Leistung', 'Nachricht', 'Status', 'E-Mail gesendet', 'Erstellt'],
                  contactLeads.map((item) => [item.id, item.contactPerson, item.company, item.email, item.phone, item.serviceType, item.message, item.status, item.emailSent === true ? 'Ja' : 'Nein', formatTimestamp(item.createdAt)]),
                );
              }}
              className="flex items-center gap-2 bg-white text-[#0D6B38] px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-sm border border-green-100"
            >
              <FileText size={20} /> CSV exportieren
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all shadow-sm border border-red-100"
            >
              <LogOut size={20} /> Abmelden
            </button>
          </div>
        </div>

        {dataError && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {dataError}
          </div>
        )}
        <p className="mb-6 text-xs font-medium text-gray-500">
          Aus Performance- und Datenschutzgründen werden je Bereich höchstens die 100 neuesten Datensätze angezeigt.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-green-50 text-[#0D6B38] rounded-2xl flex items-center justify-center">
              <Users size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-[#0B2341]">{jobApplications.length}</div>
              <div className="text-sm font-bold text-[#424751] uppercase tracking-wider">Bewerbungen</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-[#0B2341] rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-[#0B2341]">{offerLeads.length}</div>
              <div className="text-sm font-bold text-[#424751] uppercase tracking-wider">Angebote</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Mail size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-[#0B2341]">{contactLeads.length}</div>
              <div className="text-sm font-bold text-[#424751] uppercase tracking-wider">Kontakte</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === 'jobs' 
                ? 'bg-[#0D6B38] text-white shadow-lg' 
                : 'bg-white text-[#424751] hover:bg-gray-50'
            }`}
          >
            Bewerbungen
          </button>
          <button 
            onClick={() => setActiveTab('offers')}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === 'offers' 
                ? 'bg-[#0B2341] text-white shadow-lg' 
                : 'bg-white text-[#424751] hover:bg-gray-50'
            }`}
          >
            Angebotsanfragen
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === 'contacts' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white text-[#424751] hover:bg-gray-50'
            }`}
          >
            Kontaktanfragen
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'jobs' && (
            jobApplications.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
                <p className="text-gray-500 font-medium">Noch keine Bewerbungen eingegangen.</p>
              </div>
            ) : (
              jobApplications.map((app) => (
                <motion.div 
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-[#0B2341]">{app.name}</h3>
                        <span className="px-3 py-1 bg-green-100 text-[#0D6B38] text-xs font-bold rounded-full uppercase">
                          {app.jobType}
                        </span>
                        <EmailFailedBadge emailSent={app.emailSent} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Phone size={18} className="text-gray-400" />
                          <span className="font-medium">{app.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Building size={18} className="text-gray-400" />
                          <span className="font-medium">{app.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <MapPin size={18} className="text-gray-400" />
                          <span className="font-medium">{app.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Calendar size={18} className="text-gray-400" />
                          <span className="font-medium">Start: {app.startDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-4">
                      <div className="text-xs text-gray-400 font-medium">
                        {formatTimestamp(app.createdAt)}
                      </div>
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus('job_applications', app.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none transition-all ${
                          app.status === 'new' ? 'border-green-200 bg-green-50 text-[#0D6B38]' :
                          app.status === 'rejected' ? 'border-red-200 bg-red-50 text-red-600' :
                          'border-blue-200 bg-blue-50 text-[#0B2341]'
                        }`}
                      >
                        <option value="new">Neu</option>
                        <option value="reviewed">Geprüft</option>
                        <option value="contacted">Kontaktiert</option>
                        <option value="rejected">Abgelehnt</option>
                        <option value="hired">Eingestellt</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => deleteRecord('job_applications', app.id, app.name)}
                        disabled={deletingKey === `job_applications/${app.id}`}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={16} /> {deletingKey === `job_applications/${app.id}` ? 'Löscht …' : 'Löschen'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )
          )}

          {activeTab === 'offers' && (
            offerLeads.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
                <p className="text-gray-500 font-medium">Noch keine Angebotsanfragen eingegangen.</p>
              </div>
            ) : (
              offerLeads.map((lead) => (
                <motion.div 
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-[#0B2341]">{lead.companyName}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-[#0B2341] text-xs font-bold rounded-full uppercase">
                          {lead.objectType}
                        </span>
                        <EmailFailedBadge emailSent={lead.emailSent} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Users size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Mail size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Phone size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <MapPin size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-4">
                      <div className="text-xs text-gray-400 font-medium">
                        {formatTimestamp(lead.createdAt)}
                      </div>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus('offer_leads', lead.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none transition-all ${
                          lead.status === 'new' ? 'border-blue-200 bg-blue-50 text-[#0B2341]' :
                          lead.status === 'closed' ? 'border-gray-200 bg-gray-50 text-gray-600' :
                          'border-green-200 bg-green-50 text-[#0D6B38]'
                        }`}
                      >
                        <option value="new">Neu</option>
                        <option value="contacted">Kontaktiert</option>
                        <option value="visited">Besichtigt</option>
                        <option value="offered">Angebot erstellt</option>
                        <option value="closed">Abgeschlossen</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => deleteRecord('offer_leads', lead.id, lead.companyName)}
                        disabled={deletingKey === `offer_leads/${lead.id}`}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={16} /> {deletingKey === `offer_leads/${lead.id}` ? 'Löscht …' : 'Löschen'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )
          )}

          {activeTab === 'contacts' && (
            contactLeads.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
                <p className="text-gray-500 font-medium">Noch keine Kontaktanfragen eingegangen.</p>
              </div>
            ) : (
              contactLeads.map((lead) => (
                <motion.div 
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-[#0B2341]">{lead.contactPerson}</h3>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full uppercase">
                          {lead.serviceType}
                        </span>
                        <EmailFailedBadge emailSent={lead.emailSent} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Building size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.company || 'Privat'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Mail size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#424751]">
                          <Phone size={18} className="text-gray-400" />
                          <span className="font-medium">{lead.phone || 'Keine Angabe'}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 italic">
                        "{lead.message}"
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-4">
                      <div className="text-xs text-gray-400 font-medium">
                        {formatTimestamp(lead.createdAt)}
                      </div>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus('leads', lead.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none transition-all ${
                          lead.status === 'new' ? 'border-purple-200 bg-purple-50 text-purple-600' :
                          lead.status === 'closed' ? 'border-gray-200 bg-gray-50 text-gray-600' :
                          'border-green-200 bg-green-50 text-[#0D6B38]'
                        }`}
                      >
                        <option value="new">Neu</option>
                        <option value="contacted">Kontaktiert</option>
                        <option value="closed">Abgeschlossen</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => deleteRecord('leads', lead.id, lead.contactPerson)}
                        disabled={deletingKey === `leads/${lead.id}`}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={16} /> {deletingKey === `leads/${lead.id}` ? 'Löscht …' : 'Löschen'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
