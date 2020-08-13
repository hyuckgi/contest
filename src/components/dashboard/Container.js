import React, { useCallback, useMemo } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { WithFullLayout } from '@/layouts';
import { service } from '@/configs';

import Content from './Content';

import Img1 from '@/assets/slider_top1.png';
import Img2 from '@/assets/slider_top2.png';

function Container() {
  const history = useHistory();
  const params = useParams();

  const onClick = () => {
    history.push('/detail');
  };

  const getImgSrc = useCallback(
    () => {
      return service.getValue(params, 'time', false) ? Img2 : Img1
    },
    [params],
  );

  const imgSrc = useMemo(() => getImgSrc(), [getImgSrc])

  return (
    <Layout className="dashboard-wrap">
      <Content />
      <Layout.Sider width="28%">
        <Row justify="space-between" align="center" style={{ height: '100%' }}>
          <Col flex="0 0 100%" style={{ marginBottom: 10 }}>
            <Card className="sider-card" bordered={false}>
              <Row style={{ height: '100%' }} justify="center" align="middle">
                <Col flex="1 1 100%" onClick={onClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <img src={imgSrc} alt="sider-top" />
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