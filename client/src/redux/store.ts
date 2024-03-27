import { legacy_createStore as createStore } from "redux";
import reducer from "./reducers";
import { setLocalStorage } from "@/utils/cookie";

const store = createStore(
  reducer
)

store.subscribe(() => {
  // 订阅更新localStorage
  const stateToStore = store.getState();
  setLocalStorage('user', stateToStore.user);
})


export default store;