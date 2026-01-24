import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import TasksPage from '../pages/TasksPage';
import AdminUsersPage from '../pages/AdminUsersPage';

import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import AppLayout from './layout/AppLayout';

function Main() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/tasks" element={<TasksPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default Main;
