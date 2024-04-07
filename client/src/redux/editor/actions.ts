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