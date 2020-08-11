import React from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

function WithSiderLayout(WrappedComponent) {
  return ({ ...props }) => {
    return (
      <Sider
        className="sider-wrap"
        theme={props.theme || 'light'}
        width={props.width || '300'}
        {...props}
      >
        <WrappedComponent {...props} />
      </Sider>
    );
  };
}

export default WithSiderLayout;
