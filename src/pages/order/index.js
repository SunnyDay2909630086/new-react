import React, { useState } from 'react';
import { Table, Card, Button } from 'antd';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const OrderList = () => {
  // 使用 useState hook 定义状态
//   const [orderInfo, setOrderInfo] = useState({});
//   const [orderComfirmVisible, setOrderComfirmVisible] = useState(false);
  
  return (
    <div style={{margin: '10px'}}>
      <Card style={{ marginBottom: '10px' }} >

      </Card>
      <Card style={{ marginBottom: '10px' }} >
        <Button type='primary' style={{ marginRight: '10px'}}>订单详情</Button>
        <Button type='primary'>结束订单</Button>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default OrderList;