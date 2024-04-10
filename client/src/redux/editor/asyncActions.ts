import { AnyAction, Dispatch } from "redux";
import editorProjectConfig from '@/pages/Editor/DataModel';
import {
  setProjectData,
  setActivePageUUID,
  setActiveElementUUID,
  insertPage,
  addHistoryCache
} from "./actions";
import store from "../store";

export const setProjectDataAsync = (data?: any) => async (dispatch: any) => {
  let projectData = data;
  if (!projectData) {
    projectData = editorProjectConfig.getProjectConfig();
  }
  dispatch(setProjectData(projectData));

  const state = store.getState();
  if (!state.editor.projectData.pages || !state.editor.projectData.pages.length) {
    dispatch(addPage())
  }
  dispatch(setActivePageUUIDAsync(state.editor.projectData.pages[0].uuid))
}

export const addPage = (uuid?: string) => async (dispatch: Dispatch<AnyAction>) => {
  const state = store.getState();
  let data = editorProjectConfig.getPageConfig();
  let index = -1;
  if (uuid) {
    index = state.editor.projectData.pages.findIndex((v: { uuid: string; }) => v.uuid === uuid)
  } else {
    index = state.editor.projectData.pages.length -1;
  }
  dispatch(insertPage(data, index));
}

export const setActivePageUUIDAsync = (uuid: string) => (dispatch: any) => {
  dispatch(setActivePageUUID(uuid));
  // 当前选中页面切换后清空元素选中的uuid
  dispatch(setActiveElementUUIDAsync(''))
}

export const setActiveElementUUIDAsync = (uuid: string) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(setActiveElementUUID(uuid));
}


// ================================历史纪录========================================
export const addHistoryCacheAsync = () => (dispatch: any) => {
  dispatch(addHistoryCache())
}

