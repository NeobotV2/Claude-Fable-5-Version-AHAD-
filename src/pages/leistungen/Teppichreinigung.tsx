import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Teppichreinigung() {
  return <ServicePage service={getService('teppichreinigung')} />;
}
