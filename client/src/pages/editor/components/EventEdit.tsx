import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';



const items: MenuProps['items'] = [
  {
    label: '点击',
    key: 'click',
  },
];

const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log(key)
};

const EventEdit: FC = () => {
  const activeElementUUID = useSelector((state: any) => state.editor.activeElementUUID);


  return (
    <div className="components-attr-edit">
      <div className="scrollbar components-attr-edit">
        {activeElementUUID ?
          <div className="attr-edit-inner">
            <div className="animate-edit-btn-wrapper">
              <Dropdown.Button
                icon={<DownOutlined />}
                menu={{ items, onClick }}
                type="primary"
              >
                添加事件
              </Dropdown.Button>
            </div>
          </div> :
          <span className="gray paddingT30 text-center">请在画板上选择需要编辑得元素</span>
        }

      </div>
    </div>
  )
}



export default EventEdit;