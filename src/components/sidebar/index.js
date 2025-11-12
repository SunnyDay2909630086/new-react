import React, { useState } from "react";
import { Menu, Image } from "antd";
import { useNavigate } from 'react-router-dom';
import menuList from '../../config/menuConfig';
import "./index.less";

const Sidebar = () => {
  const [current, setCurrent] = useState('/home');
  const [openKeys, setOpenKeys] = useState(['/home']);
  
  const navigate = useNavigate();
   // 处理菜单项点击
  const handleMenuClick = (e) => {
    // console.log('Clicked menu item:', e.key);
    setCurrent(e.key);
    // 这里可以添加路由跳转逻辑
    navigate(e.key);
  };
  // 处理子菜单展开/收起
  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

    
    return (
      <div className="sidebar-container">
          <div className="sidebar-logo">
              <Image width={50} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
              <h1>Imooc MS</h1>
          </div>
          <div>
            <Menu
              onClick={handleMenuClick}
              onOpenChange={handleOpenChange}
              style={{ width: '100%'}}
              openKeys={openKeys}
              selectedKeys={[current]}
              mode="vertical"
              theme="dark"
              items={menuList}
            />
          </div>
      </div>
    );
}

export default Sidebar;
