export default {
  namespace: 'common',
  state: {},

  effects: {},

  reducers: {
    save(state: any, { payload }) {
      return { ...state, ...payload };
    },
  },
};
