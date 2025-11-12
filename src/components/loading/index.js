// src/components/Loading.js
import React from 'react';
import './index.less';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>加载中...</p>
    </div>
  );
};

export default Loading;