import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Winterdienst() {
  return <ServicePage service={getService('winterdienst-hausmeisterservice')} />;
}
