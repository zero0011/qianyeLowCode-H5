import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./user/reducers";
import editorReducer from "./editor/reducers";
import { setLocalStorage } from "@/utils/cookie";

const reducer = combineReducers({  
  user: userReducer,
  editor: editorReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
)

store.subscribe(() => {
  // 订阅更新localStorage
  const stateToStore = store.getState();
  setLocalStorage('user', stateToStore.user);
})


export default store;