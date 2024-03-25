import { combineReducers } from 'redux';
import { UPDATE_ACCESS_TOKEN } from './actions';  
  
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
        access_token: action.payload
      }
    default:
      return state;  
  }
}

const reducer = combineReducers({  
  user: userReducer  
});

export default reducer;