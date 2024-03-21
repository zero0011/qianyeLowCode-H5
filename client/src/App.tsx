import React, { lazy, Suspense, useState } from 'react'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源

function App() {
  const [ show, setShow ] = useState(false)
  
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    import('./app.less')
    setShow(true)
  }
  return (
    <>
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      { show && <Suspense fallback={'...'}><LazyDemo /></Suspense> }
    </>
  )
}
export default App
