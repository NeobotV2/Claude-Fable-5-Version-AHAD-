import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Industrie() {
  return <ServicePage service={getService('industrie-produktionsreinigung')} />;
}
