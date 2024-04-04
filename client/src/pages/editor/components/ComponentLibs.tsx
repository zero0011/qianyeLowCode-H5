import React, { FC } from "react";
import eleConfig from "@/config/eleConfig";
import { eleConfigType, ComponentType } from "@/config/eleConfig";

const ComponentLibs: FC = () => {

  const eleDomRender = (ele: eleConfigType, index: number) => {
    return (
      <li key={ele.title} className="clearfix paddingB30">
        <div className="components-libs-title">
          <p>{ele.title}</p>
        </div>

        {ele.components && ele.components.length > 0 ? (
          ele.components.map((element: ComponentType, i: number) => (
            <div key={element.elName}>
              <div className="components-lib-item">
              <div className="lib-item-img">
                <span className={`${element.icon}`}></span>
              </div>
              <p className="lib-item-title">{element.title}</p>
            </div>
            </div>
          ))
        ) : (
          <p className="gray text-center paddingT20">待完善...</p>
        )}
      </li>
    )
  }

  return (
    <div className="components-libs-wrapper scrollbar-wrapper">
      <p className="page-title-editor text-center">组件库</p>
      <div className="scrollbar">
        <ul className="scrollbar-wrapper">
          {eleConfig.map((ele, index) => eleDomRender(ele, index))}
        </ul>
      </div>
    </div>
  )
}

export default ComponentLibs;