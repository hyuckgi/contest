import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Table } from 'antd';
import moment from 'moment';

import { columns, service, formats } from '@/configs';

const sources = [
  {
    key: '1',
    label: '예측발전량[kWh]',
    dataIndex: ['yesterdayPv'],
  },
  {
    key: '2',
    label: '재예측 발전량[kWh]',
    dataIndex: ['todayPv'],
  },
  {
    key: '4',
    label: '재예측 충/방전량[kWh]',
    dataIndex: ['todayEss'],
  },
  {
    key: '5',
    label: '예측 오차율[%]',
    dataIndex: ['today'],
    functionKey: 'predict',
  }
];

function getPredict(params) {
  const { yesterdayTotal = 0, todayPv = 0, todayEss = 0 } = params;
  
  // const yesterdayTotal = service.getValue(params, 'yesterday.total', 0);
  // const todaypPv = service.getValue(params, 'today.pv', 0);
  // const essValue = service.getValue(params, `${params.dataIndex.join(',')}.ess`, 0);

  // return yesterdayTotal === 0 ? 0 : service.getFixed(((yesterdayTotal - (todaypPv - essValue)) / yesterdayTotal) * 100)
  return yesterdayTotal === 0 ? 0 : service.getFixed((Math.abs(yesterdayTotal - (todayPv - todayEss)) / yesterdayTotal) * 100)
}

const defulatSlice = 6;
const validSlice = 5;

function TableWrap(props) {
  const { times = {}, timeInterval = 0, dataSource = {} } = props;
  const labels = service.getLabels({...times, interval: 'HOURLY' });
  const [ flexibleClassName, setFlexibleClassName ] = useState(null);

  useEffect(() => {
    const setClassName = () => {
      setFlexibleClassName('flex');
      setTimeout(() => {
        setFlexibleClassName(null);
      }, 1200)
    }
    setClassName();
    return () => {
      setFlexibleClassName(null);
    }
  }, [timeInterval]);

  const getMergedColumns = useCallback(() => {
    const defaultColumns = columns.detailColumns.map(column => {
      return column
    });
    
    return [...defaultColumns, ...labels.filter((label, idx) => idx > (timeInterval > validSlice ? validSlice : timeInterval) + defulatSlice).map((label, idx) => {
      return {
        key: moment(label, formats.timeFormat.HALFDATEHOUR).format(formats.timeFormat.TIME_HOUR),
        dataIndex: moment(label, formats.timeFormat.HALFDATEHOUR).format(formats.timeFormat.TIME_HOUR),
        title: `${moment(label, formats.timeFormat.HALFDATEHOUR).format(formats.timeFormat.TIME_HOUR)} ~ ${moment(label, formats.timeFormat.HALFDATEHOUR).add(1, 'h').format(formats.timeFormat.TIME_HOUR)}`,
        width: 120,
        align: 'center',
        className: idx > (timeInterval <= 5 ? 2 : timeInterval - 3 ) ? 'flex-column' : ''
      }
    })];
  }, [labels, timeInterval]);

  const getDataSource = useCallback(() => {
    return sources.map((source) => {
      return {
        key: source.key,
        label: source.label,
        ...labels.reduce((result, label, idx) => {
          result[moment(label, formats.timeFormat.HALFDATEHOUR).format(formats.timeFormat.TIME_HOUR)] = service.getValue(source, 'functionKey', false) ? getPredict({ yesterdayTotal: service.getValue(dataSource, `yesterdayTotal.${idx}`, 0), todayPv: service.getValue(dataSource, `todayPv.${idx}`, 0), todayEss: service.getValue(dataSource, `todayEss.${idx}`, 0) }) : service.getValue(dataSource, `${source.dataIndex.join(',')}.${idx}`, 0)
          return result;
        }, {}),
      }
    });
  }, [dataSource, labels]);

  const mergedColumns = useMemo(() => getMergedColumns(), [getMergedColumns]);
  const datasource = useMemo(() => getDataSource(), [getDataSource]);

  return (
    <Table
      columns={mergedColumns}
      dataSource={datasource}
      className={flexibleClassName}
      scroll={{ x: 1500, y: 'calc((100vh - 300px) / 2)' }}
      locale={{ emptyText: null }}
      pagination={false}
    />
  )
}

export default TableWrap
