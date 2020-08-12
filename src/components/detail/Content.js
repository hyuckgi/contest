import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { useHistory, } from 'react-router-dom';
import moment from 'moment';

import { CommonChart } from '@/components/commons';
import { WithContentLayout } from '@/layouts';
import { formats, service } from '@/configs';

import mockData from '@/tft.json';

import imgLogo from '@/assets/logo.png';
import TableWrap from './TableWrap';

const { Title } = Typography;

function Content() {
  const history = useHistory();
  const [ timeInterval, setTimeInterval ] = useState(0);
  const [ current ] = useState(moment().year(2020).month(6).date(27).hour(9).minute(0));

  const [ times ] = useState({
    from: moment().startOf('day'),
    to: moment().endOf('day'),
  });

  const [ dataSource, setDataSource ] = useState([]);

  const yesterday = service.getValue(dataSource, 'predicts.0', []);
  const todayList = service.getValue(dataSource, 'predicts', []).slice(5, service.getValue(dataSource, 'predicts.length', 0));
  const today = service.getValue(todayList, `${timeInterval}`, []);

  useEffect(() => {
    setDataSource(service.getValue(mockData, '0'), [])
    return () => {
      setDataSource([])
    }
  }, []);

  useEffect(() => {
    const dispatch = () => {
      const el = document.getElementsByClassName('clickable-chart')[0];
      el.addEventListener('click', (e) => {
        if (e.y > 150) {
          setTimeInterval(state => {
            if(state === 10) {
              return 0
            }
            return state + 1;
          })
        }
      })
    }
    dispatch();
    return () => {}
  }, []);

  useEffect(() => {
    return () => {
      setTimeInterval(0)
    }
  }, []);

  const onClick = useCallback(() => {
    history.replace('/dashboard/time')
  }, [history]);

  const getTitle = useCallback(() => {
    return (
      <Row justify="space-between" align="middle">
        <Col span={3}>
          <img src={require('@/assets/logo.png')} alt="logo" style={{ width: '90%', maxWidth: 130 }} />
        </Col>
        <Col span={21} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
          <Title level={4} style={{ color: '#ffffff', fontSize: 21, display: 'inline-block' }}>
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
          }, 
          {
            name: '전일 예측 연계전력(PV+ESS)',
          }, 
          {
            name: '전일 예측 충/방전량(ESS)',
            icon: 'rect'
          },
          {
            name: '당일 재예측 발전량(PV)'
          },
          {
            name: '당일 재예측 충/방전량(ESS)',
            icon: 'rect'
          }
        ],
        textStyle: {
          color: '#4e73aa',
        },
        top: 10,
        selected: {
          // '전일 예측 발전량(PV)': false
        }
      },
      xAxis: {
        data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'HOURLY' }),
      },
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
            color: '#a9c8ff',
          },
          lineStyle: {
            color: '#a9c8ff',
            width: 4
          },
          data: (yesterday || []).map(item => service.getValue(item, 'pv', 0)),
          smooth: true,
          smoothMonotone: 'x'
        },
        {
          type: 'line',
          name: '전일 예측 연계전력(PV+ESS)',
          data: (yesterday || []).map(item => service.getValue(item, 'total', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#b8d2ff',
          },
          lineStyle: {
            color: '#b8d2ff',
            type: 'dashed',
            width: 4
          },
          smooth: true,
          smoothMonotone: 'x'
        },
        {
          type: 'line',
          name: '전일 예측 충/방전량(ESS)',
          data: (yesterday || []).map(item => service.getValue(item, 'ess', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#1830e3',
          },
          areaStyle: {},
          stack: '1',
          lineStyle: {
            color: '#1830e3',
            width: 1
          },
          smooth: true,
          smoothMonotone: 'x',
          sampling: 'average',
        },
        {
          type: 'line',
          name: '당일 재예측 발전량(PV)',
          data: (today || []).map(item => service.getValue(item, 'pv', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#0dffdb',
          },
          lineStyle: {
            color: '#0dffdb',
            width: 4
          },
          smooth: true,
          smoothMonotone: 'x'
        },
        {
          type: 'line',
          name: '당일 재예측 충/방전량(ESS)',
          data: (today || []).map(item => service.getValue(item, 'ess', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#0dffdb',
          },
          areaStyle: {},
          stack: '1',
          lineStyle: {
            color: '#0dffdb',
            width: 1
          },
          smooth: true,
          smoothMonotone: 'x',
          sampling: 'average',
        }
      ]
    }
  }, [yesterday, times, today]);

  const getRangeOptions = useCallback(() => {
    return {
      legend: {
        data: [
          {
            name: '전일 예측 오차범위',
          },
          {
            name: '당일 예측 오차범위',
            icon: `image://${imgLogo}`
          }
        ],
        textStyle: {
          color: '#4e73aa',
        },
        top: 10
      },
      xAxis: {
        data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'HOURLY' }),
      },
      yAxis: {
        axisLabel: {
          color: '#4e73aa',
          inside: true,
          formatter: (value) => {
            if (value === 0) {
              return null;
            }
            return value;
          },
          padding: [0, 0, 0, 0]
        }
      },
      series: [
        {
          type: 'line',
          name: '전일 예측 오차범위',
          data: (yesterday || []).map((item, idx) => {
            const yesterdayTotal = service.getValue(item, 'total', 0);
            const pv = service.getValue(today, `${idx}.pv`, 0);
            const yesterdayEss = service.getValue(item, 'ess', 0);

            return yesterdayTotal === 0 ? 0 : service.getFixed(((yesterdayTotal - (pv - yesterdayEss)) / yesterdayTotal) * 100)
          }),
          symbol: 'none',
          itemStyle: {
            color: '#f4f26a',
          },
          smooth: true,
          lineStyle: {
            color: '#f4f26a',
            type: 'dashed',
            width: 4
          }
        },
        {
          type: 'line',
          name: '당일 예측 오차범위',
          data: (yesterday || []).map((item, idx) => {
            const yesterdayTotal = service.getValue(item, 'total', 0);
            const pv = service.getValue(today, `${idx}.pv`, 0);
            const todayEss = service.getValue(today, `${idx}.ess`, 0);

            return yesterdayTotal === 0 ? 0 : service.getFixed(((yesterdayTotal - (pv - todayEss)) / yesterdayTotal) * 100)
          }),
          symbol: 'none',
          itemStyle: {
            color: '#f4f26a',
          },
          smooth: true,
          lineStyle: {
            color: '#f4f26a',
            width: 4
          }
        },
      ]
    }
  }, [times, yesterday, today]);

  const title = useMemo(() => getTitle(), [getTitle]);
  const options = useMemo(() => getOptions(), [getOptions]);
  const rangeOptions = useMemo(() => getRangeOptions(), [getRangeOptions]);

  return (
    <Card title={title} style={{ height: 'calc(100vh - 60px)'}} headStyle={{ borderBottom: 'none', padding: 0, minHeight: 'auto' }} bodyStyle={{ height: 'calc(100% - 56px)', padding: 0, paddingTop: 14 }} bordered={false}>
      <Typography className="title-wrap">
        <Title level={4}>네모1</Title>      
        <Typography.Text>실시간 발전 현황</Typography.Text>
      </Typography>

      <CommonChart
        className="clickable-chart"
        options={options}
        style={{ height: 'calc((100vh - 300px) * 0.7)' }}
      />

      <CommonChart
        options={rangeOptions}
        style={{ height: 120, marginBottom: 30 }}
      />

      <TableWrap times={times} yesterday={yesterday} today={today} timeInterval={timeInterval} />
    </Card>
  );
}

export default WithContentLayout(Content);
