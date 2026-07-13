export interface JobProfile {
  id: string;
  title: string;
  employment: string;
  region: string;
  department: 'unterhalt' | 'glas' | 'bau' | 'sonder' | 'leitung';
  /**
   * `profile` means AHAD generally accepts interest for this field. It is not
   * an assertion that a dated vacancy is currently open and must not emit
   * JobPosting structured data.
   */
  status: 'profile' | 'active' | 'closed';
  verifiedAt: string | null;
  validThrough: string | null;
}

export const JOB_PROFILES: JobProfile[] = [
  { id: 'reinigungskraft-vs', title: 'Reinigungskraft (m/w/d)', employment: 'Minijob · Teilzeit · Vollzeit', region: 'Villingen-Schwenningen & Umgebung', department: 'unterhalt', status: 'profile', verifiedAt: null, validThrough: null },
  { id: 'vorarbeit-sbk', title: 'Vorarbeiter:in Gebäudereinigung (m/w/d)', employment: 'Vollzeit', region: 'Schwarzwald-Baar-Kreis', department: 'sonder', status: 'profile', verifiedAt: null, validThrough: null },
  { id: 'objektleitung-stuttgart', title: 'Objektleiter:in (m/w/d)', employment: 'Vollzeit', region: 'Region Stuttgart', department: 'leitung', status: 'profile', verifiedAt: null, validThrough: null },
  { id: 'glas-fassade-sued', title: 'Glas- & Fassadenreiniger:in (m/w/d)', employment: 'Vollzeit', region: 'Süddeutschland', department: 'glas', status: 'profile', verifiedAt: null, validThrough: null },
];

export const ACTIVE_JOBS = JOB_PROFILES.filter((job) => job.status === 'active' && job.verifiedAt && job.validThrough);

export function jobProfile(id: string | null | undefined) {
  return JOB_PROFILES.find((profile) => profile.id === id) || null;
}
