import React from 'react';
import { Layout } from 'antd';

// Header와 Footer를 갖고 있는 layout입니다. HOC

function WithFullLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Layout className="app" style={{ minHeight: '100vh' }}>
          {/* WrappedComponent는 반드시 Layout으로 wrapping되어야 하며, Layout.Content를 포함해야한다 */}
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  };
}

export default WithFullLayout;
