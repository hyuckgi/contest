import React, { useCallback, useMemo, useState } from 'react';
import { Layout, Button } from 'antd';
import moment from 'moment';

import { HeaderComponent, BreadCrumb } from '@/layouts';
import { service } from '@/configs';
import { CommonChart } from '@/components/commons';

function Content() {  
  const [ times ] = useState({
    from: moment().subtract(1, 'd').hour(17),
    to: moment().add(1, 'd').hour(3),
  });

  console.log('times', times)
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
          name: '시간별 연계전력(PV+ESS)',
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
    // // const type = values.site.types.find(({dataIndex}) => dataIndex === service.getValue(site, 'type', null))
    // if (type) {
    //   // const legends = type.getChartLegends(interval);
    //   // const merged = legends.filter(legend => root === 'summary' ? summaryLegends.includes(legend.key) : legend.key !== 'link').map(legend => {
    //   //   const matched = legendOptions.filter(({key}) => key === service.getValue(legend, 'key', null)).find(legend => legend)
    //   //   return matched ? { ...legend, ...matched } : legend
    //   // });
  
    //   return {
    //     legend: {
    //       data: legends.map(legend => legend.label),
    //     },
    //     xAxis: {
    //       data: service.getXAxisData({ from: moment(from), to: moment(to), interval }),
    //     },
    //     series: merged.map((legend) => {
    //       return {
    //         ...legend,
    //         legend: {
    //           icon: 'circle',
    //           itemWidth: 10,
    //         },
    //         name: legend.label,
    //         stack: root === 'summary' ? '' : legend.stack,
    //         data: legend.key === 'link' ? service.getLinkedPower(site) : service.getValue(site, `${legend.dataIndex.join('.')}`, []).map(item => service.getFixed(service.getValue(item, `${legend.dataKey}`, 0)))
    //       }
    //     })
    //   }
    // }
    // return {}
  }, []);
  
  const options = useMemo(() => getOptions(), [getOptions]);
  
  console.log('options', options)

  return (
    <Layout.Content style={{ marginRight: 36 }}>
      <HeaderComponent />
      <Layout style={{ background: 'transparent', paddingTop: 14, height: 'calc(100% - 44px)' }}>
        <Layout.Content>
          <BreadCrumb root="dashboard" />

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

