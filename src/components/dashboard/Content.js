/* eslint-disable no-param-reassign */
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { HeaderComponent, BreadCrumb } from '@/layouts';
import { service } from '@/configs';
import { CommonChart } from '@/components/commons';

import mockData from '@/tft-total.json';

function Content() {
  const params = useParams();

  const [ current, setCurrent ] = useState(moment().year(2020).month(6).date(27).hour(9).minute(0));

  const [ times ] = useState({
    from: moment(current).subtract(1, 'd').hour(18),
    to: moment(current).add(1, 'd').hour(4),
  });

  useEffect(() => {
    const setTime = () => {
      if (params.time) {
        return setCurrent(moment().year(2020).month(6).date(27).hour(20).minute(0))
      }
      return setCurrent(moment().year(2020).month(6).date(27).hour(9).minute(0))
    }
    setTime();
    return () => {}
  }, [params.time]);
  

  const getOptions = useCallback(() => {
    return {
      legend: {
        data: ['전일 예측 연계전력(PV+ESS)', '시간별 연계전력(PV+ESS)'],
        textStyle: {
          color: '#4e73aa',
        }
      },
      xAxis: {
        data: service.getXAxisData({ from: moment(times.from), to: moment(times.to), interval: 'HOURLY' }),
      },
      series: [
        {
          type: 'line',
          name: '전일 예측 연계전력(PV+ESS)',
          data: (mockData || []).map(item => service.getValue(item, 'predict', 0)),
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
          name: '시간별 연계전력(PV+ESS)',
          data: params.time ? (mockData || []).map(item => service.getValue(item, 'real', 0)).slice(0, -8) : [],
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
  }, [times, params.time]);
  
  const options = useMemo(() => getOptions(), [getOptions]);

  return (
    <Layout.Content style={{ marginRight: 36 }}>
      <HeaderComponent />
      <Layout style={{ background: 'transparent', paddingTop: 14, height: 'calc(100% - 44px)' }}>
        <Layout.Content>
          <BreadCrumb root="dashboard" time={current} />

          <div className="chart-wrap" style={{ marginTop: 81 }}>
            <CommonChart 
              options={options}
              style={{ height: 'calc(100vh - 227px)' }}
            />

            <Button type="primary" className="btn-small">입찰서 생성</Button>
          </div>
        </Layout.Content>
      </Layout>
    </Layout.Content>
  )
}


export default Content

