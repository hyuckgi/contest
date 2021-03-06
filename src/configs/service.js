import moment from 'moment';

const defaultDecimal = 2;

const service = {
  getValue: (obj, key, defaultValue) => {
    if (!obj) {
      return defaultValue;
    }

    if (!key) {
      return defaultValue;
    }

    const keys = key.split('.');
    let value = obj;
    for (let i = 0, len = keys.length; i < len; i += 1) {
      const newValue = value[keys[i]];
      if (!newValue) {
        return defaultValue;
      }
      value = newValue;
    }
    return value;
  },
  getFixed: (
    value = undefined,
    decimal = defaultDecimal,
  ) => {
    if (!value) {
      return 0;
    }
    return Number((value || 0).toFixed(decimal));
  },
  getPrefix: (interval)  => {
    switch (interval) {
      case 'MONTHLY':
        return {
          timeType: 'months',
          gap: 1,
          format: 'YYYY-MM',
          translate: 'MM',
          column: 'YYYY-MM',
        };
      case 'HOURLY':
        return {
          timeType: 'hours',
          gap: 1,
          format: 'YYYY-MM-DD HH',
          translate: 'HH',
          column: 'HH:mm',
        };
      case 'MINUTE':
        return {
          timeType: 'minutes',
          gap: 5,
          format: 'YYYY-MM-DD HH:mm',
          translate: 'mm',
          column: 'HH:mm',
        }
      default:
        return {
          timeType: 'days',
          gap: 1,
          format: 'YYYY-MM-DD',
          translate: 'MM-DD',
          column: 'YYYY-MM-DD',
        };
    }
  },
  getXAxisData: (params) => {
    const labels = service.getLabels(params);
    const prefixs = service.getPrefix(params.interval);
    return labels.map((label) => moment(label, prefixs.format).format(prefixs.translate));
  },
  getLabels: (params) => {
    const { from, to, interval } = params;
    const prefixs = service.getPrefix(interval);
    const diffs = (moment(to).diff(moment(from), prefixs.timeType) / prefixs.gap).toFixed(0);
    const length = Number(diffs) + 1;

    return new Array(length).fill('').map((item, idx) => moment(from, prefixs.format)
      .add(prefixs.gap * idx, prefixs.timeType)
      .format(prefixs.format));
  },
};

export default service;
