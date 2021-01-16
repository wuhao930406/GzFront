import { keyword, classify, jobdetail, userinfo,train_record } from '@/services/factory';
let trans = localStorage.getItem("train");
const GlobalModel = {
  namespace: 'global',
  state: {
    istop: false,
    postData: {
      name: '',
      min_classify_id: '',
      max_classify_id: '',
      pageIndex: 1,
    },
    params: {
      name: '',
      min_classify_id: '',
      max_classify_id: '',
      pageIndex: 1,
    },
    train: trans?JSON.parse(trans):{
      end_station:"",
      start_station:"",
      end_date:"",
      start_date:""	
    },
    keyword: [],
    classify: [],
    userinfo: {},
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
      let newpost = {
        ...lastpostData,
        ...payload,
      };
      yield put({
        type: 'save',
        payload: {
          postData: newpost,
        },
      });
      return newpost;
    },
    *params({ payload }, { call, put, select }) {
      //paload 传入修改值即可
      const lastpostData = yield select((state) => state.global.params);
      let newpost = {
        ...lastpostData,
        ...payload,
      };
      yield put({
        type: 'save',
        payload: {
          params: newpost,
        },
      });
      return newpost;
    },
    *train({ payload }, { call, put, select }) {
      //paload 传入修改值即可
      const lastpostData = yield select((state) => state.global.train);
      let newpost = {
        ...lastpostData,
        ...payload,
      };
      localStorage.setItem("train",JSON.stringify(newpost))
      yield put({
        type: 'save',
        payload: {
          train: newpost,
        },
      });
      return newpost;
    },
    *keyword({ payload }, { call, put, select }) {
      let response = yield call(keyword, payload);
      yield put({
        type: 'save',
        payload: { keyword: response?.data?.dataList },
      });
      return response;
    },
    *classify({ payload }, { call, put, select }) {
      let response = yield call(classify, payload);
      yield put({
        type: 'save',
        payload: { classify: response?.data?.dataList },
      });
      return response;
    },
    *userinfo({ payload }, { call, put, select }) {
      let response = yield call(userinfo, payload);
      yield put({
        type: 'save',
        payload: { userinfo: response?.data},
      });
      return response;
    },
    *jobdetail({ payload }, { call, put, select }) {
      let response = yield call(jobdetail, payload);
      return response;
    },
    *train_record({ payload }, { call, put, select }) {
      let response = yield call(train_record, payload);
      return response;
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
