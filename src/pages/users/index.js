import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Alert, Tag, Descriptions } from 'antd';
import { useRequestMethods } from '../../utils/request';

const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (sex) => (
      <Tag >
        {sex === 1 ? '女' : '男'}
      </Tag>
    ),
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    key: 'birthday',
  },
  {
    title: '婚否',
    dataIndex: 'isMarried',
    key: 'isMarried',
    render: (isMarried) => (
      <Tag >
        {isMarried === 0 ? '未婚' : '已婚'}
      </Tag>
    ),
  },
];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [resData, setResData] = useState({});
  const { get, post, loading, error } = useRequestMethods();

  const loadUsers = async () => {
      let resList = [];
      let res = {};
    // console.log(resData, '--------res');
    const params = {
      page: resData.page || 1,
      page_size: resData.page_size || 10,
    };
    const data = await get('/usersTable/list', params);
    res = data.result || {};
    setResData(res);
    resList = data.result.list.map((item, index) => ({
          ...item,
          key: item.id || index // 确保有唯一的 key 
        }));
      setUsers(resList);
  };

  // const addUser = async (userData) => {
  //   try {
  //     const newUser = await post('/users', userData);
  //     // setUsers(prev => [...prev, newUser]);
  //   } catch (err) {
  //     console.error('添加用户失败:', err);
  //   }
  // };

  useEffect(() => {
      loadUsers();
  }, []);

  const handlePageChange = (newPagination) => {
    // console.log(newPagination, 'newPagination');
    resData.page = newPagination.current;
    resData.page_size = newPagination.pageSize;
    loadUsers();
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
     <Card  title="员工列表" >
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
        dataSource={users}
        loading={loading}
        pagination={{
          current: resData.page || 1,
          pageSize: resData.page_size || 10,
          total: resData.total_count || 0,
          // showSizeChanger: true,
          // showQuickJumper: true,
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

export default UsersList;
