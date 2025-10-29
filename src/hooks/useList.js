// hooks/useList.js
import { useState, useCallback } from 'react';
import { useRequest } from './useRequest';

export const useList = (initialParams = {}) => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  let [rawData, setRawData] = useState(null);
  const [params, setParams] = useState(initialParams);
  
  const { requestList, loading, error } = useRequest();

  // 统一的 setState 函数 - 确保数据类型正确
  const updateState = useCallback((newState) => {
    console.log('updateState 被调用:', newState);
    
    // 确保 list 始终是数组
    if (newState.list !== undefined) {
    }
    
    // 确保 pagination 是对象
    if (newState.pagination !== undefined) {
      const safePagination = typeof newState.pagination === 'object' && newState.pagination !== null 
        ? newState.pagination 
        : { current: 1, pageSize: 10, total: 0 };
      // console.log('设置 pagination:', safePagination);
      setPagination(safePagination);
    }
    if (newState.rawData !== undefined) {
      const newResult = newState.rawData?.data?.result;
      console.log(newResult, 'newState.rawData.data.result');
      if (Array.isArray(newResult)) {
        console.log(newResult, '--------------newResult');
        const safeList = newResult || [];
        const newList = safeList.map((item, index) => ({
          ...item,
          key: item.id || index // 确保有唯一的 key 
        }));
        setList(newList);
      }else{
        setRawData(newResult);
        // rawData = newResult;
      }
    }
  }, []);

  // 请求列表数据
  const fetchList = useCallback(async (newParams = {}) => {
    const mergedParams = { ...params, ...newParams };
    console.log('开始请求，参数:', mergedParams);
    setParams(mergedParams);
    try {
      const result = await requestList(updateState, mergedParams.url, mergedParams, mergedParams.method);
      console.log('请求完成，结果:', result.rawData);
      setRawData(result.rawData);
      console.log(rawData, '--------------newResult');

      return result;
    } catch (err) {
      console.error('fetchList 错误:', err);
      throw err;
    }
  }, [params, requestList, updateState]);

  // 分页变化处理
  const handlePageChange = useCallback((current, pageSize) => {
    const newPagination = { current, pageSize };
    setPagination(newPagination);
    return fetchList({ ...params, ...newPagination });
  }, [fetchList, params]);

  // 搜索
  const handleSearch = useCallback((searchParams) => {
    setPagination(prev => ({ ...prev, current: 1 }));
    return fetchList({ ...searchParams, current: 1 });
  }, [fetchList]);

  // 重置
  const handleReset = useCallback(() => {
    const initialPagination = {
      current: 1,
      pageSize: 10,
      total: 0
    };
    setParams(initialParams);
    setPagination(initialPagination);
    return fetchList({ ...initialParams, ...initialPagination });
  }, [fetchList, initialParams]);

  return {
    // 状态
    list,
    rawData,
    pagination,
    params,
    loading,
    error,
    
    // 方法
    fetchList,
    handlePageChange,
    handleSearch,
    handleReset,
    setList,
    setParams,
    setPagination
  };
};

export default useList;