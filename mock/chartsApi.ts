import mockJs from 'mockjs';

const getChartsData = {
  todayList: [0, 6, 14, 24, 14, 12, 8, 18, 12, 6, 2, 0],
  hourList: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
  dateList: [
    '2019-07-25',
    '2019-07-26',
    '2019-07-27',
    '2019-07-28',
    '2019-07-29',
    '2019-07-30',
    '2019-07-31',
  ],
  numList: [14, 6, 8, 12, 14, 8, 6],
  sortList: [
    { id: 1, name: '金沙滩风景区', count: '10000' },
    { id: 2, name: '银沙滩风景区', count: '9999' },
    { id: 3, name: '唐岛湾公园', count: '8888' },
    { id: 4, name: '大珠山风景区', count: '7777' },
    { id: 5, name: '栈桥码头', count: '6666' },
    { id: 6, name: '八大关', count: '5555' },
    { id: 7, name: '崂山仙境', count: '4444' },
    { id: 8, name: '太清宫', count: '3333' },
    { id: 9, name: '中山公园', count: '2222' },
    { id: 10, name: '五四广场', count: '1111' },
  ],
};

export default mockJs.mock('/api/get_charts', 'get', getChartsData);
