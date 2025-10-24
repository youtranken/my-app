import { useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (name = '') => setCurrentUser({ id: 'u-1', name });
  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
