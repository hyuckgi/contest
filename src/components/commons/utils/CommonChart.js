import React from "react";
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';

// chart type
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';
 
// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// options
// import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

// import 'echarts/lib/component/title';
 
// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';
 
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';
 
// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

const defaultStyle = {
  height: 200,
}

export default function CommonChart (props) {
  const { options = {}, style } = props;

  const defaultOptions = {
    legend: {
      top: 0,
      right: 10,
      itemGap: 20,
    },
    grid: {
      left: 0,
      right: 0,
      top: 50,
      bottom: 30,
    },
    tooltip: {
      trigger: 'axis',
      position: (point, params, dom, rect, size) => {
        const { contentSize = [], viewSize = [] } = size
        const x = point[0] + contentSize[0] > viewSize[0] ? viewSize[0] - contentSize[0] : point[0]
        return [x, `${viewSize[1] - contentSize[1]}`]
      }
    },
    xAxis: {
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
      }
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
        padding: [22, 0, 0, 0]
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#4e73aa',
          type: 'dashed'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#4e73aa',
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: []
  };

  const getOption = React.useCallback(() => {
    return options ? Object.keys(options).reduce((result, key) => {
      if (Array.isArray(result[key])) {
        result[key] = options[key].length ? options[key].map((item, inx) => {
          return {
            ...result[key][inx],
            ...options[key][inx]
          }
        }) : result[key]
      } else {
        result[key] = {
          ...result[key],
          ...options[key]
        }
      }
      return result;
    }, defaultOptions) : {}
  }, [options, defaultOptions]);

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={getOption()}
      notMerge
      lazyUpdate
      style={{...defaultStyle, ...style}}
    />
  );
}