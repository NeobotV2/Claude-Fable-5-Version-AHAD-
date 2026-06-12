import IndustryPage from '@/components/IndustryPage';
import { getBranche } from '@/data/branchen';

export default function Medizintechnik() {
  return <IndustryPage branche={getBranche('medizintechnik')} />;
}
