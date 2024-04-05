// 编辑区控制组件

import React, { FC } from "react";

interface ControlBarType {
  scale: number
  updateScale: Function
  showPreviewFn: Function
  cancelFn: Function
}

const ControlBar: FC<ControlBarType> = ({
  scale,
  updateScale,
  showPreviewFn,
  cancelFn
}) => {

  
  return (
    <div className="components-contrl-bar">
      <div className="button-item scale-wrappper">
        <span className="scale-btn" onClick={() => updateScale('reduce')}>
          <span className="iconfont icon-zoom-in"></span>
        </span>
        <span className="scale-input">{(scale * 100).toFixed(0)}%</span>

        <span className="scale-btn" onClick={() => updateScale('plus')}>
          <span className="iconfont icon-zoom-out"></span>
        </span>
      </div>

      <div className="button-item">
        <span className="iconfont icon-iconundo1"></span>
        <p>撤销</p>
      </div>

      <div className="button-item">
        <span className="iconfont icon-iconredo1"></span>
        <p>重做</p>
      </div>

      <div className="button-item" onClick={() => showPreviewFn()}>
        <span className="iconfont icon-icon_yulan"></span>
        <p>预览保存</p>
      </div>

      <div className="button-item" onClick={() => cancelFn()}>
        <span className="iconfont icon-icon_tuichu"></span>
        <p>退出</p>
      </div>

    </div>
  )
}


export default ControlBar;