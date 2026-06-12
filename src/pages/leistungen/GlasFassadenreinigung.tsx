import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function GlasFassadenreinigung() {
  return <ServicePage service={getService('glas-fassadenreinigung')} />;
}
