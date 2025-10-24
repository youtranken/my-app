import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ReportPage from './pages/ReportPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
// Điều hướng page theo URL.
// <Routes> chứa danh sách URL và component tương ứng.
// <PrivateRoute> kiểm tra user đã login chưa:
// Nếu chưa login → chuyển sang /login
// Nếu đã login → render page con (Dashboard/Report)