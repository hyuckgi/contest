import React from 'react';
import { Card } from 'antd';

import { WithSiderLayout } from '@/layouts';

// Card형일 경우 bodyStyle (height를 지정)
function Sider() {
  return (
    <Card title="Sider" bodyStyle={{ height: 'calc(70vh - 60px)' }}>
      Sider
    </Card>
  );
}

export default WithSiderLayout(Sider);
