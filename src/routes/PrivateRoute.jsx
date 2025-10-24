import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
  // Khi URL là /, nếu currentUser = null → tự động chuyển sang /login.

}
// Đây là cửa kiểm tra đăng nhập.