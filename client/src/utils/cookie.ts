/**
 * 公共方法
 * */

/**
 * 存储localStorage
 */
export const setLocalStorage = (name: string, content: any) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getLocalStorage = (name: string) => {
	if (!name) return;
	let data = window.localStorage.getItem(name)

	return data ? JSON.parse(data) : undefined;
}

/**
 * 删除localStorage
 */
export const removeLocalStorage = (name: string) => {
	if (!name) return;
	window.localStorage.removeItem(name);
}


export const Cookie = {
	/**
	 * getCookie
	 * @param name 
	 * @returns {*}
	 */
	get(name: string): any {
		let strCookie = document.cookie;
		let arrCookie = strCookie.split("; ");
		for (let i = 0; i < arrCookie.length; i++) {
			let arr = arrCookie[i].split("=");
			if (arr[0] == name) return arr[1];
		}
		return "";
	},

	/**
	 * 添加cookie
	 * @param name
	 * @param value
	 * @param expiresHours
	 * @param domain
	 */
	set(name: string, value: string, expiresDays: number, domain?: string | undefined, path?: undefined) {
		let cookieString = name + "=" + (value ? value : '');
		let date = new Date();

		if (domain != undefined)
			domain = ";domain=" + domain;
		else
			domain = '';

		date.setTime(date.getTime() + (expiresDays || 1) * 24 * 3600 * 1000);
		cookieString = cookieString + domain + "; path="+ (path || "/") +"; expires=" + date.toDateString();

		document.cookie = cookieString;
	},

	/**
	 * 删除cookie
	 * @param name
	 */
	remove(name: string) {
		this.set(name, '', -1);
	}
};


export function dataURItoBlob (dataURI: string) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	let byteString = atob(dataURI.split(',')[1])

	// separate out the mime components
	let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to an ArrayBuffer
	let ab = new ArrayBuffer(byteString.length)

	// create a view into the buffer
	let ia = new Uint8Array(ab)

	// set the bytes of the buffer to the correct values
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i)
	}

	// write the ArrayBuffer to a blob, and you're done
	let blob = new Blob([ab], { type: mimeString })
	return blob
}
