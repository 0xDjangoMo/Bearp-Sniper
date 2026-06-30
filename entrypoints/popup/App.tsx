import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/src/components/ProtectedRoute';
import Login from '@/src/pages/Login';
import Dashboard from '@/src/pages/Dashboard';
import './App.css';

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
