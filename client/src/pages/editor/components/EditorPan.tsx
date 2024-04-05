import React, { FC } from "react";
import { useSelector } from "react-redux";

interface EditorPanType {
  scale: number
}

const menuOptions = [{
  title: '复制',
  icon: 'iconfont iconfuzhi',
  value: 'copy'
}, {
  title: '删除',
  icon: 'iconfont iconshanchu',
  value: 'delete'
}, {
  title: '字体放大',
  icon: 'iconfont iconzitifangda',
  value: 'fontA+'
}, {
  title: '字体缩小',
  icon: 'iconfont iconzitisuoxiao',
  value: 'fontA-'
}, {
  title: '字体加粗',
  icon: 'iconfont iconzitijiacu',
  value: 'fontB'
}, {
  title: '图层上移',
  icon: 'iconfont iconziyuan1',
  value: 'layerUp'
}, {
  title: '图层下移',
  icon: 'iconfont iconxiayiyiceng',
  value: 'layerDown'
}, {
  title: '图层置顶',
  icon: 'iconfont iconcontrol-top',
  value: 'layerTop'
}, {
  title: '图层置底',
  icon: 'iconfont iconcontrol-bottom',
  value: 'layerBottom'
}]

const EditorPan: FC<EditorPanType> = ({ scale }) => {

  const projectData = useSelector((state: any) => state.editor.projectData);
  const editorMainStyle = {
    transform: `scale(${scale})`,
    width: `${projectData.width}px`,
    height: `${projectData.height}px`
  }

  return (
    <div className="editor-pane">
      <div className="editor-pane-inner">
        <div className="editor-main" style={editorMainStyle}>
          <div className="page-preview-wrapper"></div>

          <div className="page-wrapper-mask"></div>
        </div>

        <div className="page-wrapper-menu-operation menu-item-on-edit-panel">

        </div>
      </div>
    </div>
  )
}

export default EditorPan;