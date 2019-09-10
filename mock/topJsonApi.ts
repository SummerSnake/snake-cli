import mockJs from 'mockjs';

const getTopJsonData = {
  status: 200,
  msg: 'success',
  data: {
    totalAccount: 18,
    frozen: 1,
    unfrozen: 17,
  },
};

export default mockJs.mock('/api/get_top_json', 'get', getTopJsonData);
