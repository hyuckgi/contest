import React from 'react';
import { Layout } from 'antd';

import Sider from './Sider';
import Content from './Content';

function Container() {
  return (
    <Layout>
      <Sider width="400" theme="dark" />
      <Content />
    </Layout>
  );
}

export default Container;
