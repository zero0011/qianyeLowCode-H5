import editorProjectConfig from '@/pages/Editor/DataModel';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const SET_ACTIVE_PAGE_UUID = 'SET_ACTIVE_PAGE_UUID';
export const SET_ACTIVE_ELEMENT_UUID = 'SET_ACTIVE_ELEMENT_UUID';

// 初始化编辑项目数据
export function setProjectData(data?: any) {
  let projectData = data;
  if (!projectData) {
    projectData = editorProjectConfig.getProjectConfig();
  }

  return { type: SET_PROJECT_DATA, data: projectData }
}

export function setActivePageUUID(data: any) {
  return { type: SET_ACTIVE_PAGE_UUID, data }
}

export function setActiveElementUUID(data: any) {

  return { type: SET_ACTIVE_ELEMENT_UUID, data }
}