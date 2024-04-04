/**
 * psd
 */

import { post } from "@/service/httpServer";

// 上传psd解析
export const psdPpload = (p: any) => post('/quark/psd/upload', p);