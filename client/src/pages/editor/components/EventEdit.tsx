import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Dropdown, Button } from "antd";
import type { MenuProps } from 'antd';







const EventEdit: FC = () => {
  const activeElementUUID = useSelector((state: any) => state.editor.activeElementUUID);

  const onClick = (key: string) => {
    console.log(key)
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <span onClick={() => onClick('click')}>点击</span>
      ),
      key: 'click',
    },
  ];


  return (
    <div className="components-attr-edit">
      <div className="scrollbar components-attr-edit">
        {activeElementUUID ?
          <div className="attr-edit-inner">
            <div className="animate-edit-btn-wrapper">
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button type="primary">添加事件</Button>
              </Dropdown>
              <p className="gray inline-block fontsize-12 marginL10">事件在编辑模式下无效果</p>
            </div>
          </div> :
          <span className="gray paddingT30 text-center">请在画板上选择需要编辑得元素</span>
        }

      </div>
    </div>
  )
}



export default EventEdit;