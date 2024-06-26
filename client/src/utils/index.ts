import { message } from 'antd';

// 消息提醒
export const errorMessage = (content: string) => message.error(content, 2);
export const successMessage = (content: string) => message.success(content, 2);

/**
 * 生成uuid方法
 * @returns {string}
 */
export const createUUID = function (){
	var d = new Date().getTime();
	if (window.performance && typeof window.performance.now === "function") {
		d += performance.now(); //use high-precision timer if available
	}
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

/**
 * 复制到剪贴板
 */
export const copyText = (textToCopy: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				resolve(true)
			})
			.catch(() => {
				reject(false)
			})
	})
}