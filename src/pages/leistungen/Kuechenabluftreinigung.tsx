import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Kuechenabluftreinigung() {
  return <ServicePage service={getService('kuechenabluftreinigung-vdi-2052')} />;
}
