//import { queryNotices } from '@/services/user';

const GlobalModel = {
  namespace: 'global',
  state: {
    istop: false,
    notices: [],
  },
  effects: {
    *istop({ payload }, { call, put, select }) {
      yield put({
        type: 'save',
        payload: { istop:payload },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default GlobalModel;
