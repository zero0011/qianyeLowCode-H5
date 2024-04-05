import {
  SET_PROJECT_DATA,
  SET_ACTIVE_PAGE_UUID,
  SET_ACTIVE_ELEMENT_UUID,
} from "./actions";

const initialState = {
  // 当前编辑器编辑工程项目数据
  projectData: {},
  // 当前正在编辑的页面uuid
  activePageUUID: '',
  // 画板中选中的元素uuid
  activeElementUUID: '',
  // // 历史操作数据用于undo redo
  historyCache: [],
  // // redo undo 指针
  currentHistoryIndex: -1,
  activeAttrEditCollapse: ['1']
};

function editorReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_PROJECT_DATA:
      return {
        ...state,
        projectData: action.data || {}
      }
    case SET_ACTIVE_PAGE_UUID:
      return {
        ...state,
        activePageUUID: action.data || ''
      }
    case SET_ACTIVE_ELEMENT_UUID:
      return {
        ...state,
        activeElementUUID: action.data || ''
      }
    default:
      return state;
  }
}

export default editorReducer;