import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Table } from 'antd';
import { useHistory, } from 'react-router-dom';
import moment from 'moment';

import { CommonChart } from '@/components/commons';
import { WithContentLayout } from '@/layouts';
import { formats, service, columns } from '@/configs';

import mockData from '@/tft.json';

// console.log('mockData', mockData);

const { Title } = Typography;

function Content() {
  const history = useHistory();
  const [ current, setCurrent ] = useState(moment().hour(9).minute(0));

  const [ times ] = useState({
    from: moment().startOf('day'),
    to: moment().endOf('day'),
  });

  const [ dataSource, setDataSource ] = useState([]);

  const yesterDay = service.getValue(dataSource, 'predicts.0', []);

  // temp setCurrent.add(1, 'h')

  console.log('yesterDay', yesterDay)

  useEffect(() => {
    setDataSource(service.getValue(mockData, '0'), [])
    return () => {
      setDataSource([])
    }
  }, [])

  const onClick = () => {
    history.replace({
      pathname: '/dashboard',
      state: {
        from: service.getValue(history, 'location.pathname', '')
      }
    })
  }

  const getTitle = useCallback(() => {
    return (
      <Row justify="space-between" align="middle">
        <Col span={3}>
          <img src={require('@/assets/logo.png')} alt="logo" style={{ width: '90%', maxWidth: 130 }} />
        </Col>
        <Col span={21} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
          <Title level={4} style={{ color: '#ffffff', fontSize: 21, display: 'inline-block' }}>
            {current.format(formats.timeFormat.FULLDATETIME_DOT)} 
          </Title>

          <Button type="primary" className="btn-small" style={{ verticalAlign: 'top', marginLeft: 19 }} onClick={onClick}>대시보드</Button>
        </Col>
      </Row>
    )
  }, []);

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
        top: 10
      },
      xAxis: {
        data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'HOURLY' }),
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
          data: (yesterDay || []).map(item => service.getValue(item, 'pv', 0))
        },
        {
          type: 'line',
          name: '전일 예측 연계전력(PV+ESS)',
          data: (yesterDay || []).map(item => service.getValue(item, 'total', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#b8d2ff',
          },
          lineStyle: {
            color: '#b8d2ff',
            type: 'dashed',
            width: 4
          }
        },
        {
          type: 'line',
          name: '전일 예측 충/방전량(ESS)',
          data: (yesterDay || []).map(item => service.getValue(item, 'ess', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#1830e3',
          },
          areaStyle: {},
          lineStyle: {
            color: '#1830e3',
            width: 4
          }
        },
        {
          type: 'line',
          name: '당일 재예측 발전량(PV)',
          data: service.getValue(dataSource, 'predicts.5', []).map(item => service.getValue(item, 'pv', 0)),
          symbol: 'none',
          itemStyle: {
            color: '#0dffdb',
          },
          lineStyle: {
            color: '#0dffdb',
            width: 4
          }
        },
        {
          type: 'line',
          name: '당일 재예측 충/방전량(ESS)',
          data: [],
          symbol: 'none',
          itemStyle: {
            color: '#0dffdb',
          },
          areaStyle: {},
          lineStyle: {
            color: '#0dffdb',
            width: 4
          }
        }
      ]
    }
  }, [yesterDay, dataSource]);

  const getRangeOptions = useCallback(() => {
    console.log('dataSource', dataSource)
    return {
      legend: {
        data: ['전일 예측 발전량(PV)', '전일 예측 연계전력(PV+ESS)', '전일 예측 충/방전량(ESS)', '당일 재예측 발전량(PV)', '당일 재예측 충/방전량(ESS)'],
        textStyle: {
          color: '#4e73aa',
        },
        top: 10
      },
      xAxis: {
        data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'HOURLY' }),
      },
      series: [
        {
          type: 'line',
          name: '전일 예측 발전량(PV)',
          data: new Array(34).fill('').map((item, idx) => idx * 10),
          symbol: 'none',
          itemStyle: {
            color: '#b8d2ff',
          },
          lineStyle: {
            color: '#b8d2ff',
            type: 'dashed',
            width: 4
          }
        },
        {
          type: 'line',
          name: '전일 예측 연계전력(PV+ESS)',
          data: new Array(34).fill('').map((item, idx) => (idx + 1) * 10),
          symbol: 'none',
          itemStyle: {
            color: '#0d83ff',
          },
          lineStyle: {
            color: '#0d83ff',
            width: 4
          }
        },
        {
          type: 'line',
          name: '전일 예측 충/방전량(ESS)',
          data: new Array(34).fill('').map((item, idx) => (idx + 1) * 10),
          symbol: 'none',
          itemStyle: {
            color: '#0d83ff',
          },
          lineStyle: {
            color: '#0d83ff',
            width: 4
          }
        },
        {
          type: 'line',
          name: '당일 재예측 발전량(PV)',
          data: new Array(34).fill('').map((item, idx) => (idx + 1) * 10),
          symbol: 'none',
          itemStyle: {
            color: '#0d83ff',
          },
          lineStyle: {
            color: '#0d83ff',
            width: 4
          }
        },
        {
          type: 'line',
          name: '당일 재예측 충/방전량(ESS)',
          data: new Array(34).fill('').map((item, idx) => (idx + 1) * 10),
          symbol: 'none',
          itemStyle: {
            color: '#0d83ff',
          },
          lineStyle: {
            color: '#0d83ff',
            width: 4
          }
        }
      ]
    }
  }, [dataSource]);

  const getMergedColumns = useCallback(() => {
    return columns.detailColumns.map(column => {
      return column
    })
  }, [])

  const title = useMemo(() => getTitle(), [getTitle]);
  const options = useMemo(() => getOptions(), [getOptions]);
  const rangeOptions = useMemo(() => getRangeOptions(), [getRangeOptions]);
  const mergedColumns = useMemo(() => getMergedColumns(), [getMergedColumns]);

  return (
    <Card title={title} style={{ height: 'calc(100vh - 60px)'}} headStyle={{ borderBottom: 'none', padding: 0, minHeight: 'auto' }} bodyStyle={{ height: 'calc(100% - 56px)', padding: 0, paddingTop: 14 }} bordered={false}>
      <Typography className="title-wrap">
        <Title level={4}>네모1</Title>      
        <Typography.Text>실시간 발전 현황</Typography.Text>
      </Typography>
      
      <CommonChart
        options={options}
        style={{ height: 'calc((100vh - 300px) / 2)', marginBottom: 20 }}
      />

      <CommonChart
        options={rangeOptions}
        style={{ height: 120, marginBottom: 30 }}
      />

      <Table
        columns={mergedColumns}
        dataSource={[]}
        scroll={{ x: 1500, y: 'calc((100vh - 300px) / 2)' }}
        locale={{ emptyText: null }}
      />
    </Card>
  );
}

export default WithContentLayout(Content);
