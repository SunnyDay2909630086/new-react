import React from "react";
import { Row, Col, Button } from "antd";
import "./index.less";
import Utils from '../../utils/index';

export default class Header extends React.Component {
  state = {}
  componentWillUnmount() {
    this.setState({
      userName: '河畔一角',
    });

    setInterval(() => {
      let sysTime = Utils.formateDate(Date.now());
      this.setState({
        sysTime,
      });
    }, 1000);
    

  }
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24} >
            <span>欢迎，{this.state.userName}</span>
            <span>
              <Button type="primary" size="small" className="logout-btn">退出</Button>
            </span>
          </Col>
        </Row>
        <Row className="header-bottom">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="bottom-right">
            <span>{this.state.sysTime}</span>
            <span className="weather">晴转多云
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}
