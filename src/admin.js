import React from "react";
import { Row, Col } from "antd";
import Header from "./components/header/index";
import Sidebar from "./components/sidebar/index";
import Footer from "./components/footer/index";
import Home from './pages/home/index'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <Sidebar />
          </Col>
          <Col span={20} className="admin">
            <Header />
            <Home/>
            <Footer />
          </Col>
        </Row>
      </div>
    );
  }
}
