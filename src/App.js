
// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './api/authContext';
import Loading from './components/loading/index.js';
import Login from './pages/login/index.js';
import Admin from './admin.js';    
import Home from './pages/home/index';
import UIButtons from './pages/UI/buttons.js';
import UITabs from './pages/UI/tabs.js';
import UICarousel from './pages/UI/carousel.js';
import OrderList from './pages/order/index.js';
import UsersList from './pages/users/index.js';
import BikeMap from './pages/bikeMap/index.js';
import './App.css';

// 路由守卫组件，用于保护需要登录的页面
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 公开路由组件（已登录用户不能访问）
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* 登录页 - 已登录用户会自动跳转到首页 */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* 首页 - 需要登录才能访问 */}
          <Route path="/" element={<Admin />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={ <ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="ui">
                  <Route path="buttons" element={ <ProtectedRoute><UIButtons /></ProtectedRoute>} />
                  <Route path="tabs" element={  <ProtectedRoute><UITabs /></ProtectedRoute>} />
                  <Route path="carousel" element={ <ProtectedRoute><UICarousel /></ProtectedRoute>} />
              </Route>
              <Route path="order" element={ <ProtectedRoute><OrderList /></ProtectedRoute>} />
              <Route path="user" element={ <ProtectedRoute><UsersList /></ProtectedRoute>} />
              <Route path="bikeMap" element={ <ProtectedRoute><BikeMap /></ProtectedRoute>} />
          </Route>
          
          {/* 其他需要保护的路由 */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div>个人中心页面</div>
              </ProtectedRoute>
            } 
          />
          
          {/* 404 页面 */}
          <Route path="*" element={<div>页面不存在</div>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
