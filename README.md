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
  - 画布支持动态展示不同组件
  - 拖拽对齐功能
  - 生成 h5 自适应不同宽高比手机 - rem
  - 协同编辑功能
  - 编辑撤回与编辑恢复
  - 发布模版后，生成线上链接（包括二维码），支持扫描预览
  - 新增加组件库的实现要点

## 具体回答

### 1. JSON 与 HTML 具体怎么转化？扫码预览

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


#### 扫码预览

方案一：手写 JSON 转 HTML的编译工具

1. 前端编辑器通过拖拽生成一份JSON配置，保存后发送给后端。
保存后会自动生成一个 view链接，携带上模版ID

2. 点击预览时，通过模版ID拿到 JSON配置数据
然后反编译成HTML 和 内联的CSS 以及标签中自带的 事件（如 onclick）

注意：保存JSON配置后，后端可以直接去编译模版，然后放在 public 文件资源缓存中。

再预览时，通过koa中间件拦截的方式去判断是否有模版缓存，如果有则直接拿缓存资源返回。

3. 最后把生成的HTML插入到 index.html 中的 ID为app 的标签下即可。

NOTE：

编译engine.js模板引擎
npm run lib:h5-swiper

方案二：抽离已经实现的画布组件

1. 在index.html中，把页面JSON配置挂载在window下。

2. 利用react，把编译好的画布组件挂载在 根节点上。

3. 前端请求接口，返回 html文件即可。


### 画布渲染组件

#### vue

1. 首先拿到redux中的 elememt字段
2. 循环使用vue中提供的动态组件，在全局注册后，可以通过组件名渲染出对应的组件。

#### react

react中没有类似动态组件的工具，所以我们必须自己来实现。

使用高阶组件，或者是 自定义hooks都可以。


### 2. 拖拽对齐 - 吸附效果

使用redux来维持整个的JSON配置

拖拽实现

- mousedown 点击事件确定要拖拽的组件ID
- mousemove 事件调用时，通过点击的页面id和组件ID，去实时更新组件相对于画布的 绝对定位。
 - 利用节流来限制事件的执行频率

组件的拖拽对齐。

可以在拖拽过程中去监听计算拖拽组件与其他组件的相对位置。当达到某个阈值时，直接给拖拽组件赋值。

### 3. 组件库新增组件实现要点

组件文件在plugin文件夹下

#### 前提知识

我们知道在在 vue 和 react中注册一个组件不太一样。

在vue中，需要使用vue.component去全局注册组件。这样才能使用组件。
而在react中，无需显示的注册组件，会根据import动态注册。react中的组件本质是一个类或者函数

#### vue

1. 在 plugin/index.js 中，引入所有的组件，并循环使用 vue.component去注册
2. 基础组件自身的编写上，建议定义为纯函数组件，只规定组件名以及props，并通过props去渲染出ui。
3. 在组件库的配置文件中，去增加一份配置，并给出对应的组件名以及默认的props。


### react
非常类似
只不过不需要进行全局注册



### 4. 转为 h5 怎么适配兼容性问题？
- rem
- vh/vw


### 5. 编辑撤销与编辑恢复 - redux

使用redux维持编辑器状态，编辑撤销与编辑恢复也可以使用redux

具体如下：

```js
const state = {
  // 历史记录数组
  historyCache: [],
  // redo undo 指针
  currentHistoryIndex: -1,
}
```

1. 在每次拖拽和属性更新事件后，去调用 historyCache.push 为历史数组增加一项。
```js
historyCache.push({
    projectData: cloneDeep(state.editor.projectData),
    activePageUUID: state.editor.activePageUUID,
    activeElementUUID: state.editor.activeElementUUID
  })
```

2. 当点击撤销时，把当前指针减1，根据指针拿上最新push进历史数组的配置项。
再调用 replace 方法，替代redux中目前的配置数据，编辑器会去主动监听props的改变，从而恢复到上一个编辑状态。

3. 当点击恢复时，把当前指针加1，根据指针拿到历史数组的配置项。
再调用 replace 方法，替代redux中目前的配置数据，编辑器会去主动监听props的改变，从而恢复到下一个编辑状态。


### 6. 给组件增加事件机制

事件字段配置
```js
const events = [
  {
    "type": "link",
    "url": "http://localhost:8080/#/editor?id=6607abfbf83be309e488ca2b"
  },
  {
    "type": "share",
    "url": ""
  },
  {
    "type": "submitForm",
    "url": ""
  }
]
```

在模版引擎中先去绑定点击事件，当触发点击事件后，再根据 事件类型（type）
去调用不同的函数，

例如：link事件，判断为link事件后，去跳转链接



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

## css 样式隔离

### 选择器优先级
从小到大

通配符 < 标签选择器 < 类选择器 和 属性选择器 < id 选择器 < 内联样式 < !important

### vue解决样式隔离

单独针对Vue, 启动scope, 为DOM增加唯一属性 - 利用hash值

再使用属性选择器，解决样式隔离

### react解决样式隔离

方案一：BEM

block element modified

规范类名，解决样式隔离。


方案二：结合 less预处理器 和 BEM

方案一中的BEM规范挺麻烦，开发人员可能会遗漏。

可以使用less嵌套写法，在最外层组件设定类型。

在嵌套里面写此组件下的类名，本质是利用了 层级选择器。

缺点是：如果组件是嵌套组件，还是会有影响。

在子组件下，还得使用BEM规范。


方案三：css-modules


使用 css-Modules 解决 css 隔离问题，每一类名增加唯一的 hash 值

步骤如下：
1. 在 webpack 配置中，test css 文件
2. 在modules中指定生成的类名格式

使用的话，需要每次引入css文件，然后在classname中通过 . 的方式引用类名


方案四：CSS in js

style-components

写一个css对象后，直接返回一个react组件，然后类名也是hash值，解决隔离。


## webpack 打包优化 - 面试









## 广告行业术语









## react中的自定义hooks

鼓励开发者将业务逻辑封装成 自定义hooks 而不是工具函数。


## 算法题& js手写题


