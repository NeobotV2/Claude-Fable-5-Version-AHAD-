import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Sonderreinigung() {
  return <ServicePage service={getService('sonderreinigung-stillstandsservice')} />;
}
