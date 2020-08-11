import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function WithContentLayout(WrappedComponent) {
  return ({ ...props }) => {
    return (
      <Content {...props} className="content-wrap">
        <WrappedComponent {...props} />
      </Content>
    );
  };
}

export default WithContentLayout;
