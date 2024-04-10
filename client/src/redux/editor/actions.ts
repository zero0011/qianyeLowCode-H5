import store from "../store";
import { cloneDeep } from "lodash";

export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const SET_PROJECT_DATA_TITLE = 'SET_PROJECT_DATA_TITLE';
export const SET_PROJECT_DATA_DESC = 'SET_PROJECT_DATA_DESC';
export const SET_PROJECT_DATA_FLIE = 'SET_PROJECT_DATA_FLIE';
export const SET_PROJECT_DATA_SLIDE = 'SET_PROJECT_DATA_SLIDE';
export const SET_PROJECT_DATA_STATUS = 'SET_PROJECT_DATA_STATUS';
export const SET_ACTIVE_PAGE_UUID = 'SET_ACTIVE_PAGE_UUID';
export const SET_ACTIVE_ELEMENT_UUID = 'SET_ACTIVE_ELEMENT_UUID';
export const INSERT_PAGE = 'INSERT_PAGE';
export const SET_ELEMENT_COMMONSTYLE = 'SET_ELEMENT_COMMONSTYLE'
export const ADD_HISTORY_CACHE = 'ADD_HISTORY_CACHE';
export const EDITOR_UNDO = 'EDITOR_UNDO';
export const EDITOR_REDO = 'EDITOR_REDO';
export const RELAPCE_EDITOR_STATE = 'RELAPCE_EDITOR_STATE';

// 初始化编辑项目数据
export function setProjectData(data: any) {
  return { type: SET_PROJECT_DATA, data }
}

export function setActivePageUUID(data: any) {
  return { type: SET_ACTIVE_PAGE_UUID, data }
}

export function setActiveElementUUID(data: any) {
  return { type: SET_ACTIVE_ELEMENT_UUID, data }
}

// 新增页面
export function insertPage(data: any, index: number) {
  return { type: INSERT_PAGE, data, index }
}

// 修改element中的commonStyle
export function setElementCommonStyle(data: any, currentPageIndex: number, activeElementIndex: number) {
  return { type: SET_ELEMENT_COMMONSTYLE, data, currentPageIndex, activeElementIndex }
}


// ================================预览========================================

// 修改 title
export function setProjectDataTitle(title: string) {
  return { type: SET_PROJECT_DATA_TITLE, title }
}

// 修改 description
export function setProjectDataDescription(description: string) {
  return { type: SET_PROJECT_DATA_DESC, description }
}

// 修改 flipType
export function setProjectDataFlipType(flipType: number) {
  return { type: SET_PROJECT_DATA_FLIE , flipType }
}

// 修改 slideNumber
export function setProjectDataSlideNumber(slideNumber: boolean) {
  return { type: SET_PROJECT_DATA_SLIDE , slideNumber }
}

// 修改 status
export function setProjectDataStatus(status: number) {
  return { type: SET_PROJECT_DATA_STATUS , status }
}

// ================================历史纪录========================================

// 新增一条历史纪录
export function addHistoryCache() {
  const state = store.getState();
  let currentHistoryIndex = state.editor.currentHistoryIndex;
  const historyCache = cloneDeep(state.editor.historyCache);
  if (currentHistoryIndex + 1 < historyCache.length) {
    historyCache.splice(currentHistoryIndex + 1)
  }

  historyCache.push({
    projectData: cloneDeep(state.editor.projectData),
    activePageUUID: state.editor.activePageUUID,
    activeElementUUID: state.editor.activeElementUUID
  })

  // 限制undo 纪录步数，最多支持100步操作undo
  historyCache.splice(100)
  currentHistoryIndex++

  return { type: ADD_HISTORY_CACHE, historyCache, currentHistoryIndex }
}

// 编辑撤销
export function editorUndo() {
  const state = store.getState();
  let currentHistoryIndex = state.editor.currentHistoryIndex;
  currentHistoryIndex--;
  return { type: EDITOR_UNDO, currentHistoryIndex }
}

// 编辑恢复
export function editorRedo() {
  const state = store.getState();
  let currentHistoryIndex = state.editor.currentHistoryIndex;
  currentHistoryIndex++;
  return { type: EDITOR_REDO, currentHistoryIndex }
}

// 更新编辑器项目数据，从history中拿数据替换
export function relapceEditorState(projectData: any, activePageUUID: string, activeElementUUID: string) {
  const newProjectData = cloneDeep(projectData);
  return { type: RELAPCE_EDITOR_STATE, projectData: newProjectData, activePageUUID, activeElementUUID };
}