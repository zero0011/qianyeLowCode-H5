import React, { FC, ReactNode } from "react";
import configObj from "@/config";
import { baseURL } from "@/config";
import { CloseOutlined } from "@ant-design/icons";

interface previewWrapperType {
  pageId: string
  closePreview: Function
  children: ReactNode
}

const wrapperStyle = { 
  width: configObj.canvasH5Width + 'px',
  height: configObj.canvasH5Height + 'px'
}

const iframeStyle = {
  backgroundColor: "transparent",
  height: '100%',
  width: '100%'
}


const PreviewWrapper: FC<previewWrapperType> = ({
  pageId,
  closePreview,
  children
}) => {
  const iframeSrc = `${baseURL}/quark/view/${pageId}`;

  return (
    <div className="components-preview">
      <div className="setting-bg"></div>
      <div className="left-panel">
        <div className="iframe-wrapper" style={wrapperStyle}>
          <iframe src={iframeSrc} frameBorder="0" style={iframeStyle}></iframe>
        </div>
      </div>
      <div className="right-panel">
        {children}
      </div>
      <span className="cloase-btn" onClick={() => closePreview()}>
        <CloseOutlined height='28px' width='28px'/>
      </span>
    </div>
  )
}


export default PreviewWrapper;