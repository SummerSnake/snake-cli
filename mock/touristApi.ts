import mockJs from 'mockjs';

const getTouristData = {
  provinceList: [
    { id: 1, province: '山东', touristType: 1 },
    { id: 2, province: '江苏', touristType: 2 },
    { id: 3, province: '河南', touristType: 3 },
  ],
  pieLegend: ['山东', '江苏', '河南', '河北', '浙江', '湖北', '湖南', '安徽'],
  pieData: [
    { value: 10000, name: '山东' },
    { value: 9999, name: '江苏' },
    { value: 8888, name: '河南' },
    { value: 7777, name: '河北' },
    { value: 6666, name: '浙江' },
    { value: 5555, name: '湖北' },
    { value: 4444, name: '湖南' },
    { value: 3333, name: '安徽' },
  ],
  rankings: [
    { id: 1, city: '菏泽', count: '10000', good: '99%', bad: '1%' },
    { id: 2, city: '济南', count: '9999', good: '98%', bad: '2%' },
    { id: 3, city: '南京', count: '8888', good: '97%', bad: '3%' },
    { id: 4, city: '苏州', count: '7777', good: '96%', bad: '4%' },
    { id: 5, city: '武汉', count: '6666', good: '95%', bad: '5%' },
    { id: 6, city: '北京', count: '5555', good: '94%', bad: '6%' },
  ],
};

export default mockJs.mock('/api/get_tourist', 'get', getTouristData);
