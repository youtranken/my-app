import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import AuthProvider from './providers/AuthProvider.jsx';
import TaskProvider from './providers/TaskProvider.jsx';
import AppRouter from './AppRouter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/*Tạo AuthContext (login/logout, user)*/}
      <TaskProvider> {/*ạo TaskContext (tasks, columns, addTask, moveTask)*/}
        <BrowserRouter> {/*Routing theo URL (/login, /report, /)*/}
          <AppRouter /> {/* Render page tương ứng >> Đây là App chính */}
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
// Khi chạy, ReactDOM.createRoot gắn toàn bộ “cây” này vào <div id="root"> trong HTML.
// Từ đó, React chiếm quyền hiển thị toàn bộ UI
