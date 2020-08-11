import React from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

import { WithFullLayout } from '@/layouts';

import Content from './Content';

function Container() {
  const history = useHistory();

  const onClick = () => {
    history.push('/detail');
  };

  return (
    <Layout className="dashboard-wrap">
      <Content />
      <Layout.Sider width="28%">
        <Row justify="space-between" align="center" style={{ height: '100%' }}>
          <Col flex="0 0 100%" style={{ marginBottom: 10 }}>
            <Card className="sider-card" bordered={false}>
              <Row style={{ height: '100%' }} justify="center" align="middle">
                <Col flex="1 1 100%" onClick={onClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <img src={require('@/assets/sider_top.png')} alt="sider-top" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col flex="0 0 100%">
            <Card className="sider-card" bordered={false}>
              <Row style={{ height: '100%' }} justify="center" align="middle">
                <Col flex="1 1 100%" style={{ textAlign: 'center' }}>
                  <img src={require('@/assets/sider_bottom.png')} alt="sider-bottom" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout.Sider>
    </Layout>
  )
}

export default WithFullLayout(Container);