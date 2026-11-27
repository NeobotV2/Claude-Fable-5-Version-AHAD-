// Eigene kleine Datei: Seiten, die nur die Sprachnamen zeigen, laden so nicht alle Übersetzungen mit.
export type Language = 'de' | 'ar' | 'tr' | 'ru' | 'ro' | 'pl' | 'it' | 'uk' | 'el' | 'fr' | 'en';

export const languages: { id: Language; label: string; flag: string; rtl?: boolean }[] = [
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'ar', label: 'العربية', flag: '🇸🇦', rtl: true },
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { id: 'ru', label: 'Русский', flag: '🇷🇺' },
  { id: 'uk', label: 'Українська', flag: '🇺🇦' },
  { id: 'pl', label: 'Polski', flag: '🇵🇱' },
  { id: 'ro', label: 'Română', flag: '🇷🇴' },
  { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  { id: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
];
