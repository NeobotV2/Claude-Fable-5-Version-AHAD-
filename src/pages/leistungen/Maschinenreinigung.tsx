import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Maschinenreinigung() {
  return <ServicePage service={getService('maschinenreinigung')} />;
}
