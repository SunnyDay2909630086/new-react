
import axios from 'axios';

class Request {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setupInterceptors();
  }

  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // 可以根据需要添加其他通用配置
        console.log(`发起请求: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const { data } = response;   //解构赋值
        // console.log(response, '---------response');
        // console.log(data, '----------data');
        // 统一处理业务逻辑错误
        if (data.code && data.code !== 0) {
          // 这里抛出一个包含详细信息的错误对象
          const error = new Error(data.message || '请求失败');
          error.code = data.code;
          error.data = data;
          return Promise.reject(error);
        }
        return data;
      },
      (error) => {
        // 统一处理 HTTP 错误
        let errorMessage = '网络错误，请稍后重试';
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = '未授权，请重新登录';
              // 清除 token 并跳转到登录页
              localStorage.removeItem('token');
              // 注意：这里不能直接跳转，因为可能在非组件环境中使用
              // window.location.href = '/login';
              break;
            case 403:
              errorMessage = '拒绝访问';
              break;
            case 404:
              errorMessage = '请求的资源不存在';
              break;
            case 500:
              errorMessage = '服务器错误';
              break;
            default:
              errorMessage = error.response.data?.message || '请求失败';
          }
        } else if (error.request) {
          errorMessage = '网络连接失败，请检查网络';
        }
        const customError = new Error(errorMessage);
        customError.originalError = error;
        return Promise.reject(customError);
      }
    );
  }

  // 通用请求方法
  async request(config) {
    try {
      const response = await this.instance.request(config);
      return response;
    } catch (error) {
      // 这里直接抛出错误，让调用方处理错误信息
      throw error;
    }
  }

  // GET 请求
  get(url, params = {}, config = {}) {
    return this.request({
      method: 'GET',
      url,
      params,
      ...config
    });
  }

  // POST 请求
  post(url, data = {}, config = {}) {
    return this.request({
      method: 'POST',
      url,
      data,
      ...config
    });
  }

  // PUT 请求
  put(url, data = {}, config = {}) {
    return this.request({
      method: 'PUT',
      url,
      data,
      ...config
    });
  }

  // DELETE 请求
  delete(url, params = {}, config = {}) {
    return this.request({
      method: 'DELETE',
      url,
      params,
      ...config
    });
  }

  // 上传文件
  upload(url, formData, config = {}) {
    return this.request({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers
      },
      ...config
    });
  }
}

// 创建单例实例
const request = new Request();

export default request;