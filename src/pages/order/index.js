import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Alert, Tag, Descriptions } from 'antd';
import BaseForm from '../../components/BaseForm';
import { useRequestMethods } from '../../utils/request';

const OrderList = () => {
  const columns = [
  {
    title: '名称',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '订单编号',
    dataIndex: 'order_sn',
    key: 'order_sn',
  },
  {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '总共费用',
    dataIndex: 'total_fee',
    key: 'total_fee',
  },
  {
    title: '实际支付',
    dataIndex: 'user_pay',
    key: 'user_pay',
  },
  {
    title: '距离',
    dataIndex: 'distance',
    key: 'distance',
  },
];
   const [orderList, setOrderList] = useState([]);
    const [resData, setResData] = useState({});
    const { get, post, loading, error } = useRequestMethods();
  
  const fetchList = async () => {
      let resList = [];
      let res = {};
    const params = {
      page: resData.page || 1,
      page_size: resData.page_size || 10,
    };
    const data = await get('/order/list', params);
    res = data.result || {};
    setResData(res);
    resList = data.result.item_list.map((item, index) => ({
          ...item,
          key: index // 确保有唯一的 key 
        }));
      setOrderList(resList);
  };

  useEffect(() => {
      fetchList();
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

  const handlePageChange = (newPagination) => {
    // console.log(newPagination, 'newPagination');
    resData.page = newPagination.current;
    resData.page_size = newPagination.pageSize;
    fetchList();
  };

  const filterSubmit = (params) => {
    params = params;
    fetchList(params);
  }

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
     <Card title="订单列表" >
      {error && (
        <Alert
          message="请求错误"
          description={error.message}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Button type='primary' style={{ marginRight: '10px'}}>订单详情</Button>
      <Button type='primary'>结束订单</Button>
      <Table
        columns={columns}
        dataSource={orderList}  // 使用安全的数据源
        loading={loading}
        pagination={{
          current: resData.page || 1,
          pageSize: resData.page_size || 10,
          total: resData.total_count || 0,
          showTotal: (total, range) => 
            `共 ${total} 条`
        }}
        onChange={handlePageChange}
        rowKey='key'
        locale={{ emptyText: '暂无数据' }}
      />
    </Card>
  );
};

export default OrderList;