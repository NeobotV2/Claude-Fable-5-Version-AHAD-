import IndustryPage from '@/components/IndustryPage';
import { getBranche } from '@/data/branchen';

export default function HotellerieObjektbetrieb() {
  return <IndustryPage branche={getBranche('hotellerie-objektbetrieb')} />;
}
