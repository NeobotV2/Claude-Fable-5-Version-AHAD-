import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Baureinigung() {
  return <ServicePage service={getService('baureinigung')} />;
}
