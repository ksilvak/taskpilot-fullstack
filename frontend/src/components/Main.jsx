import { Routes, Route } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import TasksPage from '../pages/TasksPage';
import AdminUsersPage from '../pages/AdminUsersPage';
import ProtectedRout from './ProtectedRoute';
import AdminRoute from '../components/AdminRoute';


function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRout>
              <TasksPage />
            </ProtectedRout>
          } 
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsersPage />
            </AdminRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
