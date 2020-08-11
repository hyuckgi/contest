import React from 'react';
import { List, Card, Button } from 'antd';

import { WithSiderLayout } from '@/layouts';

function Tile() {
  const data = new Array(8).fill('').map((item, idx) => {
    return {
      title: `Title ${idx + 1}`,
    };
  });

  console.log('data', data);

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card
            title={item.title}
            extra={<Button>More</Button>}
            bodyStyle={{
              minHeight: `calc(70vh / ${parseInt(data.length / 2, 10)} - 80px)`,
            }}
          >
            Card content
          </Card>
        </List.Item>
      )}
    />
  );
}

export default WithSiderLayout(Tile);
