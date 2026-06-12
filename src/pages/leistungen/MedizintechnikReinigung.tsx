import ServicePage from '@/components/ServicePage';
import { getService } from '@/data/services';

export default function MedizintechnikReinigung() {
  return <ServicePage service={getService('medizintechnik-reinigung')} />;
}
