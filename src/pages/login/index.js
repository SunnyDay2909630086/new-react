
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.less';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 如果已经登录，直接跳转到首页
  useEffect(() => {
      // console.log(isAuthenticated, 'isAuthenticated');
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    
    setLoading(true);
    setError('');

    const result = await login(username, password);
    // console.log(result, '------------result');
    if (result.success === true) {
      navigate('/', { replace: true });
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>用户登录</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            placeholder="请输入用户名"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="请输入密码"
          />
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? '登录中...' : '登录'}
        </button>
        
        <div className="demo-accounts">
          <p>测试账号：任意用户名 + 任意密码</p>
          <p>例如：admin / 123456</p>
        </div>
      </form>
    </div>
  );
};

export default Login;