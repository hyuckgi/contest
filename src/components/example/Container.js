import React, { Suspense } from 'react';
import { Layout, Row, Col, Button } from 'antd';

import { Switch, useLocation, NavLink } from 'react-router-dom';
import { WithFullLayout } from '@/layouts';
import { SubRoutes } from '@/router';

import { service } from '@/configs';

function Container({ routes }) {
  const location = useLocation();

  return (
    <Layout className="example">
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ padding: '10px' }}
      >
        <Col span={24} style={{ textAlign: 'center' }}>
          {routes
            .filter(route => service.getValue(route, 'meta.navigation.show'))
            .map(route => {
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  exact={route.exact}
                  activeClassName="active"
                  style={{ margin: '0 5px' }}
                >
                  <Button
                    type={
                      location.pathname === route.path ? 'primary' : 'ghost'
                    }
                  >
                    {route.name}
                  </Button>
                </NavLink>
              );
            })}
        </Col>
      </Row>

      <Suspense fallback={<span>&nbsp;</span>}>
        <Switch>
          {routes.map(route => {
            return <SubRoutes key={route.path} {...route} />;
          })}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default WithFullLayout(Container);
