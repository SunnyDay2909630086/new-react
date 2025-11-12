import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import "./index.less";
import Utils from '../../utils/index';
import { useAuth } from '../../api/authContext';

const Header = () => {
  const [userName, setUserName] = useState('河畔一角');
  const [sysTime, setSysTime] = useState('');
  const { logout } = useAuth();
  useEffect(() => {
    setInterval(() => {
      let sysTime = Utils.formateDate(Date.now());
      setSysTime(sysTime);
    }, 1000);
  }, []);
  const goLogout = () => {
    logout();
  }
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24} >
            <span>欢迎，{userName}</span>
            <span>
              <Button type="primary" size="small" className="logout-btn" onClick={goLogout}>退出</Button>
            </span>
          </Col>
        </Row>
        <Row className="header-bottom">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="bottom-right">
            <span>{sysTime}</span>
            <span className="weather">晴转多云
            </span>
          </Col>
        </Row>
      </div>
    );
}

export default Header;
