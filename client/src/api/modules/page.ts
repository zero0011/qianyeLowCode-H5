/*
	页面相关api
**/
import { get, post } from "@/service/httpServer";

// 获取我的页面列表
export const getMyPages = (p: any) => get('/quark/page/getMyPages', p);
// 获取我的页面详情
export const getPageDetail = (p:any) => get('/quark/page/detail', p);
// 新增页面
export const createPage = (p: any) => post('/quark/page/create', p);
// 更新页面
export const updatePage = (p: any) => post('/quark/page/update', p);
// 删除页面
export const deletePage = (p: any) => post('/quark/page/delete', p);
// 复制页面
export const copyPage = (p: any) => post('/quark/page/copy', p);
// 设置为模板
export const setTemplatePage = (p: any) => post('/quark/page/setTemplate', p);
// 发布页面
export const publishPage = (p: any) => post('/quark/page/setPublish', p);

/**
 * ========================================================================
 * */
// 获取我的模板
export const getMyTemplates = (p: any) => get('/quark/page/getMyTemplates', p);


/**
 * ========================================================================
 * */
// 获取模板市场模板
export const getPublishTemplates = (p: any) => get('/quark/page/getPublishTemplates', p);

/**
 * ========================================================================
 * */
// 获取协作人列表
export const getCooperationUserListByPageId = (p: any) => get('/quark/page/getCooperationList', p)
// 按userIds添加协作人
export const addCooperation = (p: any) => post('/quark/page/addCooperation', p)
// 删除协作人
export const delCooperation = (p: any) => post('/quark/page/delCooperation', p)
