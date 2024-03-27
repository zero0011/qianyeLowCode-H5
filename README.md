# qianyeLowCode-H5
基于react18 + hooks + ts + redux + less + Ant Design + koa的全栈h5端低代码平台

# 前言

h5端的低代码平台其实已经不少了，但是使用最新的 react17 甚至18的开发方式就比较少。所以我打算写一个这样的平台。

# 版本
- node v14.19.3
- npm v6.14.17

# 技术栈

前端：
- react: 模块化开发。
- TypeScrpit: 开发语言
- redux: 状态管理
- less: css预编译器。
- Ant Design：不造轮子
- loadsh：工具类

服务端：
koa：后端语言采用nodejs，koa文档和学习资料也比较多，express原班人马打造，这个正合适。
mongodb：一个基于分布式文件存储的数据库，比较灵活。


# 开发环境配置

- [x] 支持webpack
- [x] 支持ts
- [x] 支持 less
- [x] 支持ant design
- [x] 路由配置
- [x] 配置react-redux


# 基础业务开发

- [x] header 和 sider
- [x] 登录系统
  - [x] login路由配置 404路由配置(要点：必须更换整个页面)
  - [x] login 页面
  - [x] 启动后端服务
  - [x] 解决前后端跨域问题
  - [x] 前端请求接口管理 axios
  - [x] 前端登录模块接口设置
  - [x] 登录函数和redux的配合使用
  - [x] 退出登录
  - [x] 路由权限拦截
  - [x] 测试一下其他接口是否会携带token字段
  - [x] 个人信息组件


- [ ] 首页模块
    - [ ] 新建H5页面组件