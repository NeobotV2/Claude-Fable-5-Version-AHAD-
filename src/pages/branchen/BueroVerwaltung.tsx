import IndustryPage from '@/components/IndustryPage';
import { getBranche } from '@/data/branchen';

export default function BueroVerwaltung() {
  return <IndustryPage branche={getBranche('buero-verwaltung')} />;
}
