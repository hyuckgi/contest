import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Table } from 'antd';
import moment from 'moment';

import { columns, service, formats } from '@/configs';

const sources = [
  {
    key: '1',
    label: '예측발전량[kWh]',
    dataIndex: ['yesterday'],
    dataKey: 'pv',
  },
  {
    key: '2',
    label: '재예측발전량[kWh]',
    dataIndex: ['today'],
    dataKey: 'pv',
  },
  {
    key: '3',
    label: '전일 예측 오차율[%]',
    dataIndex: ['yesterday'],
    functionKey: 'predict',
  },
  {
    key: '4',
    label: '보정값',
    dataIndex: ['today'],
    dataKey: 'ess',
  },
  {
    key: '5',
    label: '당일 예측 오차율[%]',
    dataIndex: ['today'],
    functionKey: 'predict',
  }
];

function getPredict(params) {
  const yesterdayTotal = service.getValue(params, 'yesterday.total', 0);
  const todaypPv = service.getValue(params, 'today.pv', 0);
  const essValue = service.getValue(params, `${params.dataIndex.join(',')}.ess`, 0);

  return yesterdayTotal === 0 ? 0 : service.getFixed(((yesterdayTotal - (todaypPv - essValue)) / yesterdayTotal) * 100)
}

const defulatSlice = 6;
const validSlice = 5;

function TableWrap(props) {
  const { times = {}, timeInterval = 0 } = props;
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
  }, [props.today]);

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
          result[moment(label, formats.timeFormat.HALFDATEHOUR).format(formats.timeFormat.TIME_HOUR)] = service.getValue(source, 'functionKey', false) 
            ? getPredict({ today: service.getValue(props, `today.${idx}`, {}), yesterday: service.getValue(props, `yesterday.${idx}`, {}), dataIndex: source.dataIndex }) 
            : service.getFixed(service.getValue(props, `${source.dataIndex}.${idx}.${source.dataKey}`, 0))
          return result;
        }, {}),
      }
    });
  }, [props, labels]);

  const mergedColumns = useMemo(() => getMergedColumns(), [getMergedColumns]);
  const dataSource = useMemo(() => getDataSource(), [getDataSource]);

  return (
    <Table
      columns={mergedColumns}
      dataSource={dataSource}
      className={flexibleClassName}
      scroll={{ x: 1500, y: 'calc((100vh - 300px) / 2)' }}
      locale={{ emptyText: null }}
      pagination={false}
    />
  )
}

export default TableWrap
