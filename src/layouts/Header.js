import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;

function HeaderComponent() {
  const history = useHistory();

  return (
    <Header>
      <Row>
        <Col span={3} onClick={() => history.push('/login')}>
          <img src={require('@/assets/logo.png')} alt="logo" style={{ width: '90%', maxWidth: 130 }}/>
        </Col>
      </Row>
    </Header>
  );
}

export default HeaderComponent;
