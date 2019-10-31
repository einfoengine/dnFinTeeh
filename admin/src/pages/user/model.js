import { queryCurrent, query as queryUserss } from './service';
const UsersModel = {
  namespace: 'Users',
  state: {
    currentUsers: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUserss);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUsers',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUsers(state, action) {
      return { ...state, currentUsers: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUsers: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUsers: {
          ...state.currentUsers,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UsersModel;
