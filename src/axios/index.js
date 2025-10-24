// utils/request.js
import axios from "axios";  
import { Modal } from "antd";

// 基础配置
const BASE_API = 'https://mock.mengxuegu.com/mock/68f9b5a66999e863c862c5fc/example';

// 创建 axios 实例
const createAxiosInstance = (baseURL = BASE_API) => {
  return axios.create({
    baseURL,
    timeout: 5000,
  });
};

// 显示/隐藏 loading
const handleLoading = (show = true) => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = show ? 'block' : 'none';
  }
};

// 统一的 ajax 请求函数
export const ajax = async (options) => {
  const {
    url,
    method = 'get',
    data = {},
    isShowLoading = true,
    ...restOptions
  } = options;

  // 显示 loading
  if (isShowLoading) {
    handleLoading(true);
  }

  try {
    const instance = createAxiosInstance();
    const response = await instance({
      url,
      method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
      ...restOptions
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data?.message || '请求失败');
    }
  } catch (error) {
    console.error('请求错误:', error);
    
    Modal.error({
      title: '请求失败',
      content: error.message || '网络请求失败',
    });
    
    throw error;
  } finally {
    // 隐藏 loading
    if (isShowLoading) {
      handleLoading(false);
    }
  }
};

// 请求列表数据的函数 - 确保返回正确的数据类型
export const requestList = async (setState, url, params = {}, method = 'get') => {
  console.log('requestList 开始:', { url, params, method });
  
  try {
    const rawData = await ajax({ url, method, data: params });
    
    console.log('requestList 获取的原始数据:', rawData);
    
    // 确保 rawData 是对象
    const safeRawData = typeof rawData === 'object' && rawData !== null ? rawData : {};
    
    // 根据新的数据格式解析
    if (safeRawData && safeRawData.success) {
      // 数据在 data 字段中
      const data = safeRawData.data || {};
      
      // 确保 listData 是数组
      const listData = Array.isArray(data?.list) ? data.list :
                      Array.isArray(data?.items) ? data.items :
                      Array.isArray(data?.result) ? data.result :
                      Array.isArray(data?.data) ? data.data :
                      Array.isArray(safeRawData?.list) ? safeRawData.list : [];
      
      console.log('解析出的列表数据:', listData);
      
      // 确保 list 是数组
      const list = Array.isArray(listData) ? listData.map((item, index) => ({
        ...item,
        // key: item.id || `key-${index}` // 确保有唯一的 key
      })) : [];
      
      console.log('处理后的 list:', list);
      
      // 确保 pagination 是对象
      const pagination = {
        current: data?.current || data?.page || 1,
        pageSize: data?.pageSize || data?.size || 10,
        total: data?.total || data?.totalCount || list.length
      };
      
      // 调用 setState 更新状态
      if (setState && typeof setState === 'function') {
        const newState = {
          list,
          pagination,
          rawData: safeRawData
        };
        
        console.log('准备更新状态:', newState);
        setState(newState);
      }
      
      return {
        list,
        pagination,
        rawData: safeRawData
      };
    } else {
      console.warn('请求失败或数据格式不符合预期:', safeRawData);
      
      // 即使不成功也设置安全的状态
      const safeState = {
        list: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        rawData: safeRawData
      };
      
      if (setState && typeof setState === 'function') {
        setState(safeState);
      }
      
      return safeState;
    }
  } catch (error) {
    console.error('requestList 错误:', error);
    
    // 错误时也设置安全的状态
    const errorState = {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      rawData: null
    };
    
    if (setState && typeof setState === 'function') {
      setState(errorState);
    }
    
    throw error;
  }
};

// JSONP 函数
export const jsonp = (url) => {
  return new Promise((resolve, reject) => {
    // 需要安装 jsonp 库
    // Jsonp(url, { param: 'callback' }, (err, data) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(data);
    //   }
    // });
  });
};

// 导出默认的 ajax 函数
export default ajax;