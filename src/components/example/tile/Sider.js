import React from 'react';
import { List, Card, Button } from 'antd';

import { WithSiderLayout } from '@/layouts';

// Card형일 경우 bodyStyle (height를 지정)
function Sider() {
  const data = new Array(4).fill('').map((item, idx) => {
    return {
      title: `Title ${idx + 1}`,
    };
  });

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card
            title={item.title}
            extra={<Button>More</Button>}
            bodyStyle={{
              minHeight: `calc(70vh / ${parseInt(data.length / 1, 10)} - 80px)`,
            }}
          >
            Card content
          </Card>
        </List.Item>
      )}
    />
  );
}

export default WithSiderLayout(Sider);
