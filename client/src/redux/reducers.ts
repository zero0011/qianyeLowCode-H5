import { combineReducers } from 'redux';
import { UPDATE_ACCESS_TOKEN, UPDATE_USER_INFO } from './actions';  
  
const initialState = {  
  access_token: '',
	permissionsList: [],
	userInfo: {}
};
  
function userReducer(state = initialState, action: any) {  
  switch (action.type) {
    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.token
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    default:
      return state;  
  }
}

const reducer = combineReducers({  
  user: userReducer  
});

export default reducer;