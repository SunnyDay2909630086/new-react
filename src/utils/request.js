
import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // console.log(process.env.REACT_APP_API_BASE_URL, 'process.env.REACT_APP_API_BASE_URL');
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 基础请求 Hook
export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await request(url, options);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || '请求失败';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    clearError,
    clearData,
  };
};

// 快捷方法 Hook
export const useRequestMethods = () => {
  const { execute, ...rest } = useRequest();

  const get = useCallback((url, config = {}) => {
    // console.log(config, 'config');
    return execute(url, { ...config, method: 'GET' });
  }, [execute]);

  const post = useCallback((url, data, config = {}) => {
    return execute(url, { ...config, method: 'POST', data });
  }, [execute]);

  const put = useCallback((url, data, config = {}) => {
    return execute(url, { ...config, method: 'PUT', data });
  }, [execute]);

  const del = useCallback((url, config = {}) => {
    return execute(url, { ...config, method: 'DELETE' });
  }, [execute]);

  const patch = useCallback((url, data, config = {}) => {
    return execute(url, { ...config, method: 'PATCH', data });
  }, [execute]);

  return {
    ...rest,
    get,
    post,
    put,
    delete: del,
    patch,
  };
};

export default request;