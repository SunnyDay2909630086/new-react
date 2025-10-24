// hooks/useRequest.js
import { useState, useCallback } from 'react';
import { ajax, requestList } from '../axios/index';

// 自定义请求 Hook
export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 增强的 ajax 函数
  const enhancedAjax = useCallback(async (options) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await ajax({
        ...options,
        isShowLoading: false // 禁用默认 loading，使用 hook 的 loading
      });
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 增强的 requestList 函数
  const enhancedRequestList = useCallback(async (setState, url, params, method) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await requestList(setState, url, params, method);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    ajax: enhancedAjax,
    requestList: enhancedRequestList,
    clearError: () => setError(null)
  };
};