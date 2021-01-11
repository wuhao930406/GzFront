import { keyword, classify } from '@/services/factory';

const GlobalModel = {
  namespace: 'global',
  state: {
    istop: false,
    postData: {
      name: "",
      min_classify_id: "",
      max_classify_id: "",
      pageIndex: 1
    },
    keyword: [],
    classify: [],
  },
  effects: {
    *istop({ payload }, { call, put, select }) {
      yield put({
        type: 'save',
        payload: { istop: payload },
      });
    },
    *postData({ payload }, { call, put, select }) {
      //paload 传入修改值即可
      const lastpostData = yield select((state) => state.global.postData);
      console.log(payload)

      let newpost = {
        ...lastpostData,
        ...payload
      }
      yield put({
        type: 'save',
        payload: {
          postData: newpost
        },
      });
      return newpost
    },
    *keyword({ payload }, { call, put, select }) {
      let response = yield call(keyword, payload);
      yield put({
        type: 'save',
        payload: { keyword: response?.data?.dataList },
      });
      return response
    },
    *classify({ payload }, { call, put, select }) {
      let response = yield call(classify, payload);
      yield put({
        type: 'save',
        payload: { classify: response?.data?.dataList },
      });
      return response
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
