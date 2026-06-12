import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  auth, 
  db, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  signInWithPopup, 
  googleProvider,
  signOut,
  onAuthStateChanged,
  FirebaseUser,
  Timestamp,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType
} from '@/firebase';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  LogIn, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Trash2,
  Edit3
} from 'lucide-react';
import SEO from '@/components/SEO';

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
  createdAt: Timestamp;
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
  createdAt: Timestamp;
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
  createdAt: Timestamp;
}

export default function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [offerLeads, setOfferLeads] = useState<OfferLead[]>([]);
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'offers' | 'contacts'>('jobs');
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const sendTestEmail = async () => {
    setIsTestingEmail(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'offer_lead', 
          data: {
            companyName: "TEST FIRMA (AI STUDIO)",
            contactPerson: "Test Person",
            email: "test@example.com",
            phone: "0123456789",
            location: "Test Ort",
            objectType: "Büro",
            services: ["Unterhaltsreinigung"],
            areaSize: "100m2",
            frequency: "Täglich"
          } 
        })
      });
      if (response.ok) {
        alert('Test E-Mail wurde erfolgreich versendet!');
      } else {
        alert('Fehler beim Versenden der Test E-Mail.');
      }
    } catch (error) {
      console.error('Test email error:', error);
      alert('Netzwerkfehler beim Versenden der Test E-Mail.');
    } finally {
      setIsTestingEmail(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Admin Auth State:", firebaseUser ? `Logged in as ${firebaseUser.email}` : "Not logged in");
      
      if (firebaseUser) {
        // Create or update user profile
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: firebaseUser.email === 'Yerlikaya288@gmail.com' ? 'admin' : 'client',
              createdAt: serverTimestamp()
            });
          }
        } catch (err) {
          console.error("Error updating user profile:", err);
        }
      }
      
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    console.log("Setting up Firestore listeners for Admin...");
    
    const unsubJobs = onSnapshot(query(collection(db, 'job_applications'), orderBy('createdAt', 'desc')), (snapshot) => {
      setJobApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobApplication)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'job_applications'));

    const unsubOffers = onSnapshot(query(collection(db, 'offer_leads'), orderBy('createdAt', 'desc')), (snapshot) => {
      setOfferLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OfferLead)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'offer_leads'));

    const unsubContacts = onSnapshot(query(collection(db, 'leads'), orderBy('createdAt', 'desc')), (snapshot) => {
      setContactLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactLead)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'leads'));

    return () => {
      unsubJobs();
      unsubOffers();
      unsubContacts();
    };
  }, [user]);

  const updateStatus = async (collectionName: string, id: string, newStatus: string) => {
    try {
      await setDoc(doc(db, collectionName, id), { status: newStatus }, { merge: true });
    } catch (err) {
      console.error(`Error updating status in ${collectionName}:`, err);
      handleFirestoreError(err, OperationType.UPDATE, `${collectionName}/${id}`);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005332]"></div>
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
          <div className="w-20 h-20 bg-blue-50 text-[#004888] rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-2xl font-black text-[#001c3b] mb-4">Admin Dashboard</h1>
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
            <h1 className="text-3xl font-black text-[#001c3b] mb-2">Dashboard</h1>
            <p className="text-[#424751]">Willkommen zurück, {user.displayName}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={sendTestEmail}
              disabled={isTestingEmail}
              className="flex items-center gap-2 bg-white text-[#004888] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-sm border border-blue-100 disabled:opacity-50"
            >
              <Mail size={20} /> {isTestingEmail ? 'Sende...' : 'Test E-Mail'}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all shadow-sm border border-red-100"
            >
              <LogOut size={20} /> Abmelden
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-green-50 text-[#005332] rounded-2xl flex items-center justify-center">
              <Users size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-[#001c3b]">{jobApplications.length}</div>
              <div className="text-sm font-bold text-[#424751] uppercase tracking-wider">Bewerbungen</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-[#004888] rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-[#001c3b]">{offerLeads.length}</div>
              <div className="text-sm font-bold text-[#424751] uppercase tracking-wider">Angebote</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Mail size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-[#001c3b]">{contactLeads.length}</div>
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
                ? 'bg-[#005332] text-white shadow-lg' 
                : 'bg-white text-[#424751] hover:bg-gray-50'
            }`}
          >
            Bewerbungen
          </button>
          <button 
            onClick={() => setActiveTab('offers')}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === 'offers' 
                ? 'bg-[#004888] text-white shadow-lg' 
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
                        <h3 className="text-xl font-black text-[#001c3b]">{app.name}</h3>
                        <span className="px-3 py-1 bg-green-100 text-[#005332] text-xs font-bold rounded-full uppercase">
                          {app.jobType}
                        </span>
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
                        {app.createdAt?.toDate().toLocaleString('de-DE')}
                      </div>
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus('job_applications', app.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none transition-all ${
                          app.status === 'new' ? 'border-green-200 bg-green-50 text-[#005332]' :
                          app.status === 'rejected' ? 'border-red-200 bg-red-50 text-red-600' :
                          'border-blue-200 bg-blue-50 text-[#004888]'
                        }`}
                      >
                        <option value="new">Neu</option>
                        <option value="reviewed">Geprüft</option>
                        <option value="contacted">Kontaktiert</option>
                        <option value="rejected">Abgelehnt</option>
                        <option value="hired">Eingestellt</option>
                      </select>
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
                        <h3 className="text-xl font-black text-[#001c3b]">{lead.companyName}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-[#004888] text-xs font-bold rounded-full uppercase">
                          {lead.objectType}
                        </span>
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
                        {lead.createdAt?.toDate().toLocaleString('de-DE')}
                      </div>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus('offer_leads', lead.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none transition-all ${
                          lead.status === 'new' ? 'border-blue-200 bg-blue-50 text-[#004888]' :
                          lead.status === 'closed' ? 'border-gray-200 bg-gray-50 text-gray-600' :
                          'border-green-200 bg-green-50 text-[#005332]'
                        }`}
                      >
                        <option value="new">Neu</option>
                        <option value="contacted">Kontaktiert</option>
                        <option value="visited">Besichtigt</option>
                        <option value="offered">Angebot erstellt</option>
                        <option value="closed">Abgeschlossen</option>
                      </select>
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
                        <h3 className="text-xl font-black text-[#001c3b]">{lead.contactPerson}</h3>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full uppercase">
                          {lead.serviceType}
                        </span>
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
                        {lead.createdAt?.toDate().toLocaleString('de-DE')}
                      </div>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus('leads', lead.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none transition-all ${
                          lead.status === 'new' ? 'border-purple-200 bg-purple-50 text-purple-600' :
                          lead.status === 'closed' ? 'border-gray-200 bg-gray-50 text-gray-600' :
                          'border-green-200 bg-green-50 text-[#005332]'
                        }`}
                      >
                        <option value="new">Neu</option>
                        <option value="contacted">Kontaktiert</option>
                        <option value="closed">Abgeschlossen</option>
                      </select>
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
