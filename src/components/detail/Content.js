import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { useHistory, } from 'react-router-dom';
import moment from 'moment';

import { CommonChart } from '@/components/commons';
import { WithContentLayout } from '@/layouts';
import { formats, service } from '@/configs';

import mockData from '@/tft.json';

import TableWrap from './TableWrap';

import legend1 from '@/assets/legends/yesterday.svg';
import legend2 from '@/assets/legends/yesterdayTotal.svg';
import legend3 from '@/assets/legends/yesterdayESS.svg';

import legend4 from '@/assets/legends/today.svg';
import legend5 from '@/assets/legends/todayTotal.svg';
import legend6 from '@/assets/legends/todayESS.svg';

import reMock from './test.json';

const { Title } = Typography;

function Content() {
  const history = useHistory();
  const [ timeInterval, setTimeInterval ] = useState(0);
  const [ current ] = useState(moment().year(2020).month(6).date(27).hour(9).minute(0));

  const [ selected, setSelected ] = useState({
    '전일 예측 발전량(PV)': false,
    '전일 예측 충/방전량(ESS)': false,
    '전일 예측 연계전력(PV+ESS)': true,
    '당일 재예측 발전량(PV)': false,
    '당일 재예측 연계전력(PV+ESS)': false,
    '당일 재예측 충/방전량(ESS)': false
  });

  const [ times ] = useState({
    from: moment().startOf('day'),
    to: moment().endOf('day'),
  });

  const [ mockDataSource, setDataSource ] = useState([]);
  
  // const yesterday = service.getValue(dataSource, 'predicts.0', []);
  // const todayList = service.getValue(dataSource, 'predicts', []).slice(5, service.getValue(dataSource, 'predicts.length', 0));
  const ticks = service.getValue(mockDataSource, 'tick', []).filter(({ datetime }) => moment(datetime).isSameOrBefore(moment(current).add(timeInterval, 'hour')), 'hour').map((item) => service.getValue(item, 'kwInstant', 0));
  // const today = service.getValue(todayList, `${timeInterval}`, []);
  
  useEffect(() => {
    setDataSource(service.getValue(mockData, '0'), [])
    return () => {
      setDataSource([])
    }
  }, []);

  const dataSource = reMock;

  useEffect(() => {
    return () => {
      setTimeInterval(0)
    }
  }, []);
  
  const onClickTime = () => {
    return setTimeInterval(state => {
      if(state === 10) {
        return 0
      }
      return state + 1;
    })
  };

  const onClick = useCallback(() => {
    history.replace('/dashboard/time')
  }, [history]);

  const onLegendSelectChange = useCallback((select) => {
    setSelected(service.getValue(select, 'selected', {}))
  }, []);

  const getTitle = useCallback(() => {
    return (
      <Row justify="space-between" align="middle">
        <Col span={3}>
          <img src={require('@/assets/logo.png')} alt="logo" style={{ width: '90%', maxWidth: 130 }} />
        </Col>
        <Col span={21} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
          <Title level={4} style={{ color: '#ffffff', fontSize: 21, display: 'inline-block', cursor: 'pointer' }} onClick={onClickTime}>
            {moment(current).add(timeInterval, 'hours').format(formats.timeFormat.FULLDATETIME_DOT)} 
          </Title>

          <Button type="primary" className="btn-small" style={{ verticalAlign: 'top', marginLeft: 19 }} onClick={onClick}>대시보드</Button>
        </Col>
      </Row>
    )
  }, [current, onClick, timeInterval]);

  const getOptions = useCallback(() => {
    return {
      legend: {
        data: [
          {
            name: '전일 예측 발전량(PV)',
            icon: `image://${legend1}`
          }, 
          {
            name: '전일 예측 연계전력(PV+ESS)',
            icon: `image://${legend2}`
          }, 
          {
            name: '전일 예측 충/방전량(ESS)',
            icon: `image://${legend3}`
          },
          {
            name: '당일 재예측 발전량(PV)',
            icon: `image://${legend4}`
          },
          {
            name: '당일 재예측 연계전력(PV+ESS)',
            icon: `image://${legend5}`
          },
          {
            name: '당일 재예측 충/방전량(ESS)',
            icon: `image://${legend6}`
          }
        ],
        top: 10,
        selected
      },
      xAxis: [
        {
          type: 'category',
          axisPointer: {
            type: 'shadow',
            label: {
              fontSize: 12,
              color: '#333d4b'
            }
          },
          axisLabel: {
            color: '#4e73aa'
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'HOURLY' }),
        },
        {
          type: 'category',
          axisPointer: {
            type: 'shadow',
            label: {
              fontSize: 6,
              color: '#333d4b'
            }
          },
          axisLabel: {
            fontSize: 4,
            show: true
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          position: 'bottom',
          data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'MINUTE' }),
        }
      ],
      yAxis: {
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          type: 'line',
          name: '전일 예측 발전량(PV)',
          symbol: 'none',
          itemStyle: {
            color: '#377fff',
          },
          lineStyle: {
            color: '#377fff',
            type: 'dotted',
            width: 4
          },
          // data: (yesterday || []).map(item => service.getValue(item, 'pv', 0)),
          data: service.getValue(dataSource, 'yesterdayPv', []),
          smooth: true,
        },
        {
          type: 'line',
          name: '전일 예측 연계전력(PV+ESS)',
          // data: (yesterday || []).map(item => service.getValue(item, 'total', 0)),
          data: service.getValue(dataSource, 'yesterdayTotal', []),
          symbol: 'none',
          itemStyle: {
            color: '#b8d2ff',
          },
          lineStyle: {
            color: '#b8d2ff',
            type: 'dotted',
            width: 4
          },
          smooth: true,
        },
        {
          type: 'line',
          name: '전일 예측 충/방전량(ESS)',
          // data: (yesterday || []).map(item => service.getValue(item, 'ess', 0)),
          data: service.getValue(dataSource, 'yesterdayEss', []),
          symbol: 'none',
          itemStyle: {
            color: '#1830e3',
            opacity: 0.3
          },
          areaStyle: {
            color: '#1830e3',
            opacity: 0.3
          },
          lineStyle: {
            color: '#1830e3',
            width: 0
          },
          smooth: true,
        },
        {
          type: 'line',
          name: '당일 재예측 발전량(PV)',
          // data: (today || []).map(item => service.getValue(item, 'pv', 0)),
          data: service.getValue(dataSource, 'todayPv', []),
          symbol: 'none',
          itemStyle: {
            color: '#daff80',
          },
          lineStyle: {
            color: '#daff80',
            width: 4
          },
          smooth: true,
        },
        {
          type: 'line',
          name: '당일 재예측 연계전력(PV+ESS)',
          // data: (today || []).map(item => service.getValue(item, 'total', 0)),
          data: service.getValue(dataSource, 'todayTotal', []),
          symbol: 'none',
          itemStyle: {
            color: '#0dffdb',
          },
          lineStyle: {
            color: '#0dffdb',
            width: 4
          },
          smooth: true,
        },
        {
          type: 'line',
          name: '당일 재예측 충/방전량(ESS)',
          // data: (today || []).map(item => service.getValue(item, 'ess', 0)),
          data: service.getValue(dataSource, 'todayEss', []),
          symbol: 'none',
          itemStyle: {
            color: '#0dffdb',
            opacity: 0.5
          },
          areaStyle: {
            color: '#0dffdb',
            opacity: 0.5
          },
          lineStyle: {
            color: '#0dffdb',
            width: 0
          },
          smooth: true,
        },
        {
          type: 'bar',
          name: '실제 발전량',
          hoverAnimation: false,
          data: [0, 0, 0, 0, 0, ...ticks],
          itemStyle: {
            color: '#0a2b83',
            opacity: 0.4
          },
          xAxisIndex: 1,
        }
      ]
    }
  }, [times, selected, dataSource, ticks]);

  const title = useMemo(() => getTitle(), [getTitle]);
  const options = useMemo(() => getOptions(), [getOptions]);

  return (
    <Card title={title} style={{ height: 'calc(100vh - 60px)'}} headStyle={{ borderBottom: 'none', padding: 0, minHeight: 'auto' }} bodyStyle={{ height: 'calc(100% - 56px)', padding: 0, paddingTop: 14 }} bordered={false}>
      <Typography className="title-wrap">
        <Title level={4}>네모1</Title>      
        <Typography.Text>실시간 발전 현황</Typography.Text>
      </Typography>

      <CommonChart
        options={options}
        legendselectchanged={onLegendSelectChange}
        style={{ height: 'calc(100vh - 344px)', marginBottom: 30 }}
      />

      <TableWrap times={times} dataSource={dataSource} timeInterval={timeInterval} />
    </Card>
  );
}

export default WithContentLayout(Content);
