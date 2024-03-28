/**
 * 公共配置文件
 */

const configObj = {
	// h5模式宽高
	canvasH5Width: 375,
	canvasH5Height: 644,
	pageModeList: [{
		value: 'h5',
		label: 'H5',
		disabled: false
	}, {
		value: 'longPage',
		label: '长页H5',
		disabled: false
	}, {
		name: 'relativePage',
		label: '排版图文',
		disabled: true
	}, {
		value: 'pc',
		label: 'PC页面',
		disabled: true
	}]
}

export default configObj