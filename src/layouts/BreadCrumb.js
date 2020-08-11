import React, { useMemo, useCallback } from 'react';
import { Typography, Row, Col } from 'antd';

import { formats } from '@/configs';

const { Title } = Typography;

function BreadCrumb(props) {
  const { root = null, time } = props;
  
  const getTime = useCallback(() => {
    return root ? time.format(formats.timeFormat.FULLDATETIME_DOT) : null;
  }, [root, time]);

  const dateTime = useMemo(() => getTime(), [getTime]);

  return (
    <Row justify="space-between" align="bottom" gutter={[0, 10]}>
      <Col span={12}>
        <Title level={3} style={{ color: '#3f86ef' }}>
          실시간 발전 현황
        </Title>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Title level={4} style={{ color: '#ffffff', fontSize: 21 }}>
          {dateTime}
        </Title>
      </Col>
    </Row>
  )
}

export default BreadCrumb
