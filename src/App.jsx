// src/App.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import Navbar from './components/Navbar';

// Component Layout chính
const MainLayout = () => (
  <div>
    <Navbar />
    <main className="p-4">
      <Outlet /> {/* Nội dung trang con sẽ hiển thị ở đây */}
    </main>
  </div>
);

// Component bảo vệ: Nếu chưa đăng nhập, đá về /login
const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <MainLayout /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Route>
    </Routes>
  );
}
export default App;