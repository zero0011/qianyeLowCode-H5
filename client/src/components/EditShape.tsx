import React, { FC, ReactNode } from "react";
import style from './style/EditShape.module.less';

interface EditShapeType {
  active: boolean
  editStyle: any
  defaultStyle: any
  uuid: string
  children?: ReactNode
  handleElementClick: Function
  handleResize: Function
}

const EditShape: FC<EditShapeType> = ({
  active = false,
  defaultStyle,
  uuid,
  children,
  editStyle,
  handleElementClick,
  handleResize
}) => {

  const pointList = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'];
  const directionKey: any = {
    t: 'n',
    b: 's',
    l: 'w',
    r: 'e'
  }

  const editPointList = active ? pointList : [];

  const handleMouseDownOnPoint = (e: any, point: string) => {
    handleElementClick();
    let downEvent = e;
    downEvent.stopPropagation()
    downEvent.preventDefault() // Let's stop this event.
    const pos = { ...defaultStyle }
    let height = pos.height
    let width = pos.width
    let top = pos.top
    let left = pos.left
    let startX = downEvent.clientX
    let startY = downEvent.clientY
    let move = (moveEvent: any) => {
      let currX = moveEvent.clientX
      let currY = moveEvent.clientY
      let disY = currY - startY
      let disX = currX - startX
      let hasT = /t/.test(point)
      let hasB = /b/.test(point)
      let hasL = /l/.test(point)
      let hasR = /r/.test(point)
      let newHeight = +height + (hasT ? -disY : hasB ? disY : 0)
      let newWidth = +width + (hasL ? -disX : hasR ? disX : 0)
      pos.height = newHeight > 0 ? newHeight : 0
      pos.width = newWidth > 0 ? newWidth : 0
      pos.left = +left + (hasL ? disX : 0)
      pos.top = +top + (hasT ? disY : 0)
      handleResize(pos)
    }
    let up = () => {
      handleResize()
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const handleTopWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleMouseDownOnElement = (e: any) => {
    // 抛出事件让父组件设置当前元素选中状态
    handleElementClick();

    const pos = { ...defaultStyle }
    let startY = e.clientY
    let startX = e.clientX
    let startTop = pos.top
    let startLeft = pos.left
    let firstTime = 0, lastTime = 0;
    firstTime = new Date().getTime();
    let move = (moveEvent: any) => {
      // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
      moveEvent.stopPropagation()
      moveEvent.preventDefault()

      let currX = moveEvent.clientX
      let currY = moveEvent.clientY
      pos.top = currY - startY + startTop
      pos.left = currX - startX + startLeft
      handleResize(pos)
    }
    let up = () => {
      lastTime = new Date().getTime();
      if ((lastTime - firstTime) > 200) {
        handleResize()
      }
      document.removeEventListener('mousemove', move, true)
      document.removeEventListener('mouseup', up, true)
    }
    document.addEventListener('mousemove', move, true)
    document.addEventListener('mouseup', up, true)
    return true
  }

  const getPointStyle = (point: any) => {
    const pos = defaultStyle
    const height = pos.height
    const width = pos.width
    let hasT = /t/.test(point)
    let hasB = /b/.test(point)
    let hasL = /l/.test(point)
    let hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = height / 2
      }
    }
    const style = {
      marginLeft: (hasL || hasR) ? '-5px' : 0,
      marginTop: (hasT || hasB) ? '-5px' : 0,
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: point.split('').reverse().map((m: any) => directionKey[m]).join('') + '-resize'
    }
    return style
  }

  return (
    <div
      className={`${active ? active : ''} ${style.componentsEditShape}`}
      onClick={(e) => handleTopWrapperClick(e)}
      onMouseDown={(e) => handleMouseDownOnElement(e)}
      style={editStyle}
    >

      {editPointList.map((item: string) =>
        <div className={style.editShapePoint} key={item} onMouseDown={(e) => handleMouseDownOnPoint(e, item)} style={getPointStyle(item)}></div>
      )}

      {children}

    </div>
  )
}

export default EditShape;