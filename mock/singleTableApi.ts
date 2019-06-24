import mockJs from 'mockjs';

const getSingleTableData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    gender: '男',
    height: '170cm',
    weight: '60kg',
    hobby: 'football,basketball',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    gender: '男',
    height: '175cm',
    weight: '70kg',
    hobby: 'baseball',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Willa Black',
    age: 32,
    gender: '女',
    height: '165cm',
    weight: '50kg',
    hobby: 'swim',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default mockJs.mock('/api/get_single_table', 'get', getSingleTableData);
