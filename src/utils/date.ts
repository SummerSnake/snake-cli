import moment from 'moment';

/**
 * @desc 格式化星期
 * @param { string } day
 * @return { string }
 */
export const weekFormat = function (day: string) {
  switch (day) {
    case '1':
      return '星期一';
    case '2':
      return '星期二';
    case '3':
      return '星期三';
    case '4':
      return '星期四';
    case '5':
      return '星期五';
    case '6':
      return '星期六';
    case '0':
      return '星期天';
    default:
  }
};

/**
 * @desc 计算前一周、后一周
 * @param nowDate
 * @return { object }
 */
export const calcWeek = function (nowDate) {
  return {
    // 当前月 + 当前日 的前一周
    lastWeek: moment(nowDate).subtract(1, 'weeks'),
    // 当前月 + 当前日 的后一周
    nextWeek: moment(nowDate).add(1, 'weeks'),
  };
};

/**
 * @desc 表头数据
 * @param date
 * @return { array }
 */
export const columnsJson = function (date) {
  return [
    {
      id: 1,
      _date: moment(date).format('MM-DD'),
      _day: weekFormat(moment(date).format('d')),
    },
    {
      id: 2,
      _date: moment(date).add(1, 'days').format('MM-DD'),
      _day: weekFormat(moment(date).add(1, 'days').format('d')),
    },
    {
      id: 3,
      _date: moment(date).add(2, 'days').format('MM-DD'),
      _day: weekFormat(moment(date).add(2, 'days').format('d')),
    },
    {
      id: 4,
      _date: moment(date).add(3, 'days').format('MM-DD'),
      _day: weekFormat(moment(date).add(3, 'days').format('d')),
    },
    {
      id: 5,
      _date: moment(date).add(4, 'days').format('MM-DD'),
      _day: weekFormat(moment(date).add(4, 'days').format('d')),
    },
    {
      id: 6,
      _date: moment(date).add(5, 'days').format('MM-DD'),
      _day: weekFormat(moment(date).add(5, 'days').format('d')),
    },
    {
      id: 7,
      _date: moment(date).add(6, 'days').format('MM-DD'),
      _day: weekFormat(moment(date).add(6, 'days').format('d')),
    },
  ];
};
