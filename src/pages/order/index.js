import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Alert, Tag, Descriptions } from 'antd';
import BaseForm from '../../components/BaseForm';
import { useList } from '../../hooks/useList';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
];

const OrderList = () => {
  const {
    list,
    rawData,
    pagination,
    loading,
    error,
    fetchList,
    handlePageChange
  } = useList({
    url: '/mock',
    method: 'get',
    page: 1,
    pageSize: 10
  });

  useEffect(() => {
      fetchList();
    console.log(list, '---------list');
  }, []);

  const params = {
    page: 1
  }
  const formList = [
    {
      type: 'select',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '1',
      width: 162,
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '北京'},
        {id: '2', name: '上海'},
        {id: '3', name: '广州'},
        {id: '4', name: '深圳'},
      ]
    },
    {
      type: 'datePicker',
      label: '时间查询',
      field: 'timeQuery',
      placeholder: '请选择时间',
      initialValue: '',
      width: 300,
    },
    {
      type: 'select',
      label: '订单状态',
      field: 'orderStatus',
      placeholder: '全部',
      initialValue: '1',
      width: 162,
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '进行中'},
        {id: '2', name: '已完成'},
      ]
    }
  ];

  const handleTableChange = (newPagination) => {
    handlePageChange(newPagination.current, newPagination.pageSize);
  };
  // 确保传递给 Table 的数据是数组
  const safeDataSource = Array.isArray(list) ? list : [];

  // if (loading) return <div>加载中...</div>;

  const filterSubmit = (params) => {
    params = params;
    fetchList(params);

  }

  return (
     <Card 
      title="订单列表" 
      extra={
        <Button onClick={fetchList} loading={loading}>
          刷新
        </Button>
      }
    >
      {/* 显示原始数据信息 */}
      {rawData && (
        <Descriptions title="原始数据信息" size="small" bordered style={{ marginBottom: 16 }}>
          <Descriptions.Item label="success">{rawData.success ? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="数据条数">{safeDataSource.length}</Descriptions.Item>
          <Descriptions.Item label="总条数">{pagination.total}</Descriptions.Item>
        </Descriptions>
      )}
      {error && (
        <Alert
          message="请求错误"
          description={error.message}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Table
        columns={columns}
        dataSource={safeDataSource}  // 使用安全的数据源
        loading={loading}
        pagination={{
          current: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          total: pagination.total || 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
        }}
        onChange={handleTableChange}
        rowKey='key'
        locale={{ emptyText: '暂无数据' }}
      />

      {/* 调试信息 */}
      <div style={{ marginTop: 16, padding: 8, background: '#f5f5f5' }}>
        <h4>调试信息:</h4>
        <p>列表数据类型: {Array.isArray(list) ? '数组' : typeof list}</p>
        <p>列表数据长度: {safeDataSource.length}</p>
        <p>分页数据类型: {typeof pagination}</p>
        <p>原始数据类型: {typeof rawData}</p>
        <p>所有 key 列表: {safeDataSource.map(item => item.key).join(', ')}</p>
        <p>key 是否唯一: {new Set(safeDataSource.map(item => item.key)).size === safeDataSource.length ? '是' : '否'}</p>
      </div>
    </Card>
    // <div style={{margin: '10px'}}>
    //   <Card style={{ marginBottom: '10px' }} >
    //     <BaseForm formList={formList} filterSubmit={filterSubmit} />
    //   </Card>
    //   <Card style={{ marginBottom: '10px' }} >
    //     <Button type='primary' style={{ marginRight: '10px'}}>订单详情</Button>
    //     <Button type='primary'>结束订单</Button>
    //     <Table dataSource={dataSource} columns={columns} />
    //   </Card>
    // </div>
  );
};

export default OrderList;