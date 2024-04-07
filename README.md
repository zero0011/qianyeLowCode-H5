# qianyeLowCode-H5
基于react18 + hooks + ts + redux + less + Ant Design + koa的全栈h5端低代码平台

# 前言

h5端的低代码平台其实已经不少了，但是使用最新的 react17 甚至18的开发方式就比较少。所以我打算写一个这样的平台。

# 版本
- node v14.19.3
- npm v6.14.17

# 低代码平台原理与设计

编辑器生成页面JSON数据
服务端负责存取JSON数据
渲染时从服务端取数据JSON交给前端模板处理。

## 难点
- JSON数据设计
- JSON 与 HTML 的编译与反编译
- H5编辑器组件
  - 支持动态展示不同组件
   - 基于 Vue 动态组件特性实现（react中的类似API是什么?）
  - 拖拽对齐功能
  - 生成h5自适应不同宽高比手机 - rem
  - 协同编辑功能
  - 编辑回退 - redux - undo
  - 发布模版后，生成线上链接（包括二维码），支持扫描预览
  - 新增加组件库的实现要点


## 具体回答

1. JSON与HTML具体怎么转化？




2. 拖拽对齐？
3. 新增组件实现要点？
4. 转为h5怎么适配兼容性问题？- rem
5. 编辑回退 - redux
6. 新增事件机制
  - 点击按钮出现或者消失

# 技术栈

- 前端：
  - react: 模块化开发。
  - TypeScrpit: 开发语言
  - redux: 状态管理
  - less: css预编译器。
  - Ant Design：不造轮子
  - loadsh：工具类

- 服务端：
  - koa：后端语言采用nodejs，用koa2实现后端的MVC架构
  - mongodb：一个基于分布式文件存储的数据库


# 开发环境配置

- [x] 支持webpack
- [x] 支持ts
- [x] 支持 less
- [x] 支持ant design
- [x] 路由配置
- [x] 配置react-redux

## css作用域隔离

使用 css-Modules 解决css隔离问题，每一类明增加唯一的hash值

1. 在webpack配置中，针对css文件
2. 

