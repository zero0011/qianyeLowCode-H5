# qianyeLowCode-H5

基于 react18 + hooks + ts + redux + less + Ant Design + koa 的全栈 h5 端低代码平台

# 前言

h5 端的低代码平台其实已经不少了，但是使用最新的 react17 甚至 18 的开发方式就比较少。所以我打算写一个这样的平台。

# 版本

- node v14.19.3
- npm v6.14.17

# 低代码平台原理与设计

编辑器生成页面 JSON 数据
服务端负责存取 JSON 数据
渲染时从服务端取数据 JSON 交给前端模板处理。

## 难点

- JSON 数据设计
- JSON 与 HTML 的编译与反编译
- H5 编辑器组件
  - 支持动态展示不同组件
  - 基于 Vue 动态组件特性实现（react 中的类似 API 是什么?）
  - 拖拽对齐功能
  - 生成 h5 自适应不同宽高比手机 - rem
  - 协同编辑功能
  - 编辑回退 - redux - undo
  - 发布模版后，生成线上链接（包括二维码），支持扫描预览
  - 新增加组件库的实现要点

## 具体回答

1. JSON 与 HTML 具体怎么转化？

先说一下 JSON 具体配置

```js
pages = [ // 多页
  {
    uuid: "", // 页面id
    name: "",
    elements: [ // 一个页面下有多个组件
      {
        uuid: "", // 组件id
        elName: "qk-text", // 组件名
        animations: [],  // 组件动画
        commonStyle: {}, // 组件样式
        events: [], // 组件事件
        propsValue: {}, // 组件参数
        valueType: "" // 参数类型
      },
      {
        uuid: "",
        elName: "qk-text",
        animations: [],
        commonStyle: {},
        events: [],
        propsValue: {},
        valueType: ""
      }
    ]
  }
]
```

1. 前端编辑器通过拖拽生成一份JSON配置，保存后发送给后端。
保存后会自动生成一个 view链接，携带上模版ID

2. 点击预览时，通过模版ID拿到 JSON配置数据，
然后反编译成HTML 和 内联的CSS 以及标签中自带的 事件（如 onclick）

注意：保存JSON配置后，后端可以直接去编译模版，然后放在 public 文件资源缓存中。

再预览时，通过koa中间件拦截的方式去判断是否有模版缓存，如果有则直接拿缓存资源返回。

3. 最后把生成的HTML插入到 index.html 中的 ID为app 的标签下即可。

NOTE：

编译engine.js模板引擎
npm run lib:h5-swiper


2. 拖拽对齐 - 吸附效果

使用redux来维持整个的JSON配置

拖拽实现

- mousedown 点击事件确定要拖拽的组件ID
- mousemove 事件调用时，通过点击的页面id和组件ID，去实时更新组件相对于画布的 绝对定位。
 - 利用节流来限制事件的执行频率

组件的拖拽对齐。

可以在拖拽过程中去监听计算拖拽组件与其他组件的相对位置。当达到某个阈值时，直接给拖拽组件赋值。


3. 新增组件实现要点？

首先在

4. 转为 h5 怎么适配兼容性问题？- rem

5. 编辑回退 - redux



6. 点击事件机制

- 点击按钮 - 组件出现或者消失

# 技术栈

- 前端：
  - react: 模块化开发。
  - TypeScrpit: 开发语言
  - redux: 状态管理
  - less: css 预编译器。
  - Ant Design：不造轮子
  - loadsh：工具类

- 服务端：
  - koa：后端语言采用 nodejs，用 koa2 实现后端的 MVC 架构
  - mongodb：一个基于分布式文件存储的数据库

# 开发环境配置

- [x] 支持 webpack
- [x] 支持 ts
- [x] 支持 less
- [x] 支持 ant design
- [x] 路由配置
- [x] 配置 react-redux

## css 作用域隔离

使用 css-Modules 解决 css 隔离问题，每一类明增加唯一的 hash 值

1. 在 webpack 配置中，针对 css 文件
2.


## webpack 打包优化


## 广告场景术语