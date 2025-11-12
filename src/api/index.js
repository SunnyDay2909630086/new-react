
import request from './request';

// 登录接口
export const login = (username, password) => {
  return request.get('/login', { username, password });
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/getUserInfo');
};

// 退出登录
export const logout = () => {
  return request.post('/logout');
};

// 刷新 token
export const refreshToken = (token) => {
  return request.post('/refresh', { token });
};

// 获取订单列表
export const getOrderList = (params) => {
  return request.get('/order/list', params);
};

// 获取员工列表
export const getUsersList = (params) => {
  return request.get('/usersTable/list', params);
};

// 获取车辆地图
export const getBikeMap = (params) => {
  return request.get('/bikeMap/list', params);
};
