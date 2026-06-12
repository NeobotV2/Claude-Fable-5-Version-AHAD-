import IndustryPage from '@/components/IndustryPage';
import { getBranche } from '@/data/branchen';

export default function Gewerbeobjekte() {
  return <IndustryPage branche={getBranche('gewerbeobjekte')} />;
}
