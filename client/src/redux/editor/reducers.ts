import { SET_PRJECT_DATA } from "./actions";
import editorProjectConfig from "@/pages/Editor/DataModel";

const initialState = {
  // 当前编辑器编辑工程项目数据
  projectData:  {},
  // 当前正在编辑的页面uuid
  // activePageUUID: '',
  // // 画板中选中的元素uuid
  // activeElementUUID: '',
  // // 历史操作数据用于undo redo
  // historyCache: [],
  // // redo undo 指针
  // currentHistoryIndex: -1,
  // activeAttrEditCollapse: ['1']
};

function editorReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_PRJECT_DATA:
      return {
        ...state,
        projectData: {}
      }
    default:
      return state;
  }
}

export default editorReducer;