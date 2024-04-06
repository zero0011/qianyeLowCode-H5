import {
  SET_PROJECT_DATA,
  SET_ACTIVE_PAGE_UUID,
  SET_ACTIVE_ELEMENT_UUID,
  SET_PROJECT_DATA_TITLE,
  SET_PROJECT_DATA_FLIE,
  SET_PROJECT_DATA_DESC,
  SET_PROJECT_DATA_SLIDE,
  SET_PROJECT_DATA_STATUS,
  INSERT_PAGE
} from "./actions";

interface StateType {
  projectData: Object
  activePageUUID: string
  activeElementUUID: string
  historyCache: Array<any>
  currentHistoryIndex: number
  activeAttrEditCollapse: Array<string>
}

const initialState: StateType = {
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
    case SET_PROJECT_DATA_TITLE:
      return {
        ...state,  
        projectData: {
          ...state.projectData,
          title: action.title
        },  
      }
    case SET_PROJECT_DATA_DESC:
      return  {
        ...state,
        projectData: {
          ...state.projectData,
          description: action.description
        }
      }
    case SET_PROJECT_DATA_FLIE:
      return  {
        ...state,
        projectData: {
          ...state.projectData,
          flipType: action.flipType
        }
      }
    case SET_PROJECT_DATA_SLIDE:
      return {
        ...state,
        projectData: {
          ...state.projectData,
          slideNumber: action.slideNumber
        }
      }
    case SET_PROJECT_DATA_STATUS:
      return {
        ...state,
        projectData: {
          ...state.projectData,
          status: action.status
        }
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

    case INSERT_PAGE:
      // TODO:
      return {
        ...state,
        projectData: {
          ...state.projectData,
          pages: []
        }
      }
    default:
      return state;
  }
}

export default editorReducer;