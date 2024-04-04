import React, { FC } from "react";

interface EditorPanType {

}

const editorMainStyle = {
  'transform': 'scale(1)',
  'width': '375px',
  'height': '644px'
}

const EditorPan: FC<EditorPanType> = () => {
  return (
    <div className="editor-pane">
      <div className="editor-pane-inner">
        <div className="editor-main" style={editorMainStyle}>
          <div className="page-preview-wrapper"></div>

          <div className="page-wrapper-mask"></div>
        </div>
      </div>
    </div>
  )
}

export default EditorPan;