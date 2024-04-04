import React, { FC } from "react";
import eleConfig from "@/config/eleConfig";
import { eleConfigType, ComponentType } from "@/config/eleConfig";
import { qkRegisterComponentsObject } from "@/plugins";
import { camelCase } from "lodash";

const ComponentLibs: FC = () => {

  // 根据elName获取组件默认props数据
  const getComponentProps = (elName: string) => {
    let elComponentData;
    for (let key in qkRegisterComponentsObject) {
      if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
        elComponentData = qkRegisterComponentsObject[key];
        break;
      }
    }

    if (!elComponentData) return {}

    return elComponentData.defaultProps;
  }

  const handleClick = (element: ComponentType) => {
    const props = getComponentProps(element.elName);
    console.log(props)
    // TODO: redux
  }

  // TODO: 支持拖拽


  const eleDomRender = (ele: eleConfigType, index: number) => {
    return (
      <li key={ele.title} className="clearfix paddingB30">
        <div className="components-libs-title">
          <p>{ele.title}</p>
        </div>

        {ele.components && ele.components.length > 0 ? (
          ele.components.map((element: ComponentType, i: number) => (
            <div key={element.elName}>
              <div className="components-lib-item" onClick={() => handleClick(element)}>
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