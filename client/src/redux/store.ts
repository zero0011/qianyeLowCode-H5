import { legacy_createStore as createStore, combineReducers } from "redux";
import userReducer from "./user/reducers";
import editorReducer from "./editor/reducers";
import { setLocalStorage } from "@/utils/cookie";

const reducer = combineReducers({  
  user: userReducer,
  editor: editorReducer
});

const store = createStore(
  reducer
)

store.subscribe(() => {
  // 订阅更新localStorage
  const stateToStore = store.getState();
  setLocalStorage('user', stateToStore.user);
})


export default store;