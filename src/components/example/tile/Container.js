import React from 'react';
import { Layout } from 'antd';

import Sider from './Sider';
import Content from './Content';

function Container() {
  return (
    <Layout>
      <Sider width="30%" />
      <Content />
    </Layout>
  );
}

export default Container;
