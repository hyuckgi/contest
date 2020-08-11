import React from 'react';
import { Card, Button } from 'antd';

import { WithContentLayout } from '@/layouts';

// Card형일 경우 bodyStyle (height를 지정)
function Content() {
  return (
    <Card
      title="Content title"
      extra={<Button>More</Button>}
      bodyStyle={{ height: 'calc(70vh - 60px)' }}
    >
      Content Wrapper
    </Card>
  );
}

export default WithContentLayout(Content);
