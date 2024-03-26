import { combineReducers } from 'redux';
import { UPDATE_ACCESS_TOKEN, UPDATE_USER_INFO, UPDATE_USER_PERMISSION } from './actions';
import { getLocalStorage } from '@/utils/cookie';

// 使用localStorage初始化state
const persistedState = getLocalStorage('user');

const initialState = {
  access_token: '',
	permissionsList: [],
	userInfo: {},
  ...persistedState
};
  
function userReducer(state = initialState, action: any) {  
  switch (action.type) {
    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.token || ''
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case UPDATE_USER_PERMISSION:
      return {
        ...state,
        permissionsList: action.permissionsList || []
      }
    default:
      return state;  
  }
}

const reducer = combineReducers({  
  user: userReducer  
});

export default reducer;