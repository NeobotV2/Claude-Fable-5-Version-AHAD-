import IndustryPage from '@/components/IndustryPage';
import { getBranche } from '@/data/branchen';

export default function IndustrieProduktion() {
  return <IndustryPage branche={getBranche('industrie-produktion')} />;
}
