import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function Unterhaltsreinigung() {
  return <ServicePage service={getService('unterhaltsreinigung')} />;
}
