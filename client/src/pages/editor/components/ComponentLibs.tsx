import React, { FC } from "react";
import eleConfig from "@/config/eleConfig";

const ComponentLibs: FC = () => {



  return (
    <div className="components-libs-wrapper scrollbar-wrapper">
      <p className="page-title text-center">组件库</p>
      <div style={{ height: '100px' }}>
        <ul className="scrollbar-wrapper">
          {eleConfig
            .map(ele =>
              <li className="clearfix paddingB30">
                <div className="components-libs-title">
                  <p>{ele.title}</p>
                </div>
              </li>)}
        </ul>
      </div>
    </div>
  )
}

export default ComponentLibs;