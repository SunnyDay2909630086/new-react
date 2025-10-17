import React from "react";
import { Card, Button, Flex } from "antd";
import { SearchOutlined } from '@ant-design/icons'; 
import "../../index.less";

export default class UIButtons extends React.Component {
  render() {
    return (
      <div className="content">
        <Card title="基础按钮" variant="borderless" style={{ width: '100%' }}>
          <Flex gap="small" justify="center">
            <Button type="primary" icon={<SearchOutlined />}>确定</Button>
            <Button>编辑</Button>
            <Button type="dashed">删除</Button>
            <Button type="text">下载</Button>
            <Button type="link">Link Button</Button>
          </Flex>
        </Card>
      </div>
    );
  }
}
