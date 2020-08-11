import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';
import moment from 'moment';

import { routes } from '@/router';
import { service, formats } from '@/configs';

const { Title } = Typography;

function BreadCrumb(props) {
  const { root = null } = props;
  const [ current, setCurrent ] = useState(moment().hour(9).minute(0));
  const location = useLocation();
  const matched = routes.filter(({ path }) => path === service.getValue(location, 'pathname', null)).find((route) => route);

  useEffect(() => {
    const from = service.getValue(location, 'state.from', null);
    if(from) {
      setCurrent(moment().hour(20).minute(0))
    } else {
      setCurrent(moment().hour(9).minute(0))
    }
  }, [location]);

  useEffect(() => {
    return () => {
      location.state = {
        from: location.pathname
      }
    }
  }, []);

  const getTime = useCallback(() => {
    return root ? current.format(formats.timeFormat.FULLDATETIME_DOT) : null;
  }, [root, current]);

  const time = useMemo(() => getTime(), [getTime]);

  return (
    <Row justify="space-between" align="bottom" gutter={[0, 10]}>
      <Col span={12}>
        <Title level={3} style={{ color: '#3f86ef' }}>
          {service.getValue(matched, 'meta.navigation.breadTitle', '') }
        </Title>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Title level={4} style={{ color: '#ffffff', fontSize: 21 }}>
          {time}
        </Title>
      </Col>
    </Row>
  )
}

export default BreadCrumb
