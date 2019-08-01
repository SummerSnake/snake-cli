import mockJs from 'mockjs';

const getNoticeData = [
  { id: 1, title: '金沙滩浴场开放', sendDate: '2019-07-01' },
  { id: 2, title: '银沙滩碧海银沙', sendDate: '2019-07-01' },
  { id: 3, title: '唐岛湾公园海天一色', sendDate: '2019-08-01' },
  { id: 4, title: '大珠山风景区肃何芊芊', sendDate: '2019-06-06' },
  { id: 5, title: '栈桥码头人头攒动', sendDate: '2019-07-07' },
  { id: 6, title: '八大关欧美风情', sendDate: '2019-03-11' },
  { id: 7, title: '崂山仙境峰峦叠嶂', sendDate: '2019-01-01' },
  { id: 8, title: '太清宫香火鼎盛', sendDate: '2019-01-01' },
  { id: 9, title: '中山公园樱花漫天', sendDate: '2019-03-10' },
  { id: 10, title: '五四广场五月的风', sendDate: '2019-11-11' },
];

export default mockJs.mock('/api/get_notice', 'get', getNoticeData);
