module.exports = {
	port: 4000,
	mongodb: {
		url: 'mongodb://localhost:27017/qianyeLowCode-H5',// qianyeLowCode-H5是数据库名称
		options: {}
	},
	middleware:['handlerError'],
	jwt: {secret: 'huangwei9527'},
	crypto: {secret: '#*#*huangwei9527*#*#'},
	baseUrl: ''
}
