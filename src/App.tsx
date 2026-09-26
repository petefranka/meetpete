import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AiSeoPage = lazy(() => import('./pages/AiSeoPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-seo" element={<AiSeoPage />} />
        <Route path="/scan" element={<Navigate to="/ai-seo" replace />} />
        <Route path="/scan-my-site" element={<Navigate to="/ai-seo" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
