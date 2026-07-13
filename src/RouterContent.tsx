import AnalyticsBridge from './components/AnalyticsBridge';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './AppRoutes';

/**
 * Gemeinsamer Inhalt innerhalb des Browser- bzw. Static-Routers.
 * SSR und Client müssen denselben initialen DOM-Baum erzeugen, damit React
 * das vorgerenderte HTML ohne Fallback auf einen Client-Render hydrieren kann.
 */
export default function RouterContent() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsBridge />
      <AppRoutes />
    </>
  );
}
