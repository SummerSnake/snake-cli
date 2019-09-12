export default {
  namespace: 'tableRigger',

  /**
   * @desc 表格 state
   * pagination { object } 分页参数
   *
   * query { object } 搜索参数
   * queryShow 搜索展示
   * queryTitle 展示的title
   * queryValue 展示的value
   *
   * orders { object } 排序参数
   *
   * code { number }
   */
  state: {
    pagination: {
      current: 1,
      pageSize: 15,
    },
    query: {},
    queryShow: {},
    orders: {
      name: '',
      type: 'desc',
    },
    code: 0,
  },

  effects: {
    *fetch({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *init(_, { put, select }) {
      const initState = yield select(state => state.tableRigger);
      const url = location.hash;
      let payload = sessionStorage.getItem(url);
      const code = Math.round(Math.random() * 999999999);
      if (payload !== null && typeof payload !== 'undefined') {
        const payloadClone = JSON.parse(payload);
        payload = {
          ...payloadClone,
          code,
        };
      }
      yield put({
        type: 'save',
        payload: payload || initState,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
