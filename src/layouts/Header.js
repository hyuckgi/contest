import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Header } = Layout;

function HeaderComponent() {
  return (
    <Header>
      <Row>
        <Col span={3}>
          <img src={require('@/assets/logo.png')} alt="logo" style={{ width: '90%', maxWidth: 130 }} />
        </Col>
      </Row>
    </Header>
  );
}

export default HeaderComponent;
