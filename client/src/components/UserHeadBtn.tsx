import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import "../style/User.less";

function UserHeadBtn() {

  const [userName, setUserName] = useState('qianye');

  // 退出登录
  const loginOut = () => {
    setUserName('zs')
  }

  // 获取个人信息
  const getUserInfo = () => {
    
  }



  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={getUserInfo}>个人信息</span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={loginOut}>退出登录</span>
      ),
      danger: true,
    }
  ]

  return (
    <div className="user-head-btn-components">
      <Dropdown menu={{ items }}>
        <div>
          <span className="user-head-btn-name">{userName}</span>
          <Avatar
            shape="square"
            icon={<UserOutlined />}
          />
        </div>
      </Dropdown>
    </div>
  )
}

export default UserHeadBtn;