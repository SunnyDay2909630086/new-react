//登录状态、用户信息上下文、权限验证
import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, getUserInfo, logout as logoutApi } from '../api/index';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // 当前登录用户信息
  const [loading, setLoading] = useState(true);  // 登录状态加载中
  const [redirectPath, setRedirectPath] = useState('/'); // 存储重定向路径
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  // 检查认证状态
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // 如果有token，调用API获取用户信息
        const response = await getUserInfo();
        setUser(response.data);
      } catch (error) {
        console.error('获取用户信息失败:', error);
        // 失败则清除token
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  // 设置重定向路径
  const setRedirect = (path) => {
    setRedirectPath(path);
  };

  // 登录
  const login = async (username, password) => {
    try {
      const response = await loginApi(username, password);
      const { token, userInfo } = response.data;
      
      // 保存 token 和用户信息到本地存储localStorage
      localStorage.setItem('token', token);
      setUser(userInfo);
      
      // 登录成功后跳转到之前保存的路径或首页
      const targetPath = redirectPath || '/';
      console.log('登录成功，跳转到:', targetPath);
      navigate(targetPath, { replace: true });
      
      // 重置重定向路径
      setRedirectPath('/');
      
      return { success: true };
    } catch (error) {
      let errorMessage = '登录失败';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // 退出登录
  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('退出登录失败:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setRedirectPath('/'); // 重置重定向路径
      navigate('/login', { replace: true });
    }
  };

  // 更新用户信息
  const updateUser = (newUserInfo) => {
    setUser(prev => ({ ...prev, ...newUserInfo }));
  };

  const value = {
    user,
    login,
    logout,
    loading,
    updateUser,
    redirectPath,
    setRedirect,
    isAuthenticated: !!user
  };

  return (
    // 提供认证状态和相关方法给子组件，包裹整个应用
    //通过value属性把认证相关的状态和方法传递给所有子组件
    //{children}确保被包裹的组件能够正常渲染
    <AuthContext.Provider value={value}>   
      {children}
    </AuthContext.Provider>
  );
};