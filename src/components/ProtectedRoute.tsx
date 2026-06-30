import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuthenticated } from '@/src/lib/auth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
