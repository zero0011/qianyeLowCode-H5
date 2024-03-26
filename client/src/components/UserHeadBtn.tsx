import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import "../style/user.less";
import store from "@/redux/store";
import useGoLogin from "@/hooks/useGoLogin";
import useDoLogout from "@/hooks/useDoLogout";

function UserHeadBtn() {
  const state = store.getState();
  const goLogin = useGoLogin();
  const doLogout = useDoLogout();
  const userInfo = state.user.userInfo;
  const userName = userInfo.name || 'admin';
  const isLogined = !!state.user.access_token;

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
        <span onClick={doLogout}>退出登录</span>
      ),
      danger: true,
    }
  ]

  return (
    <div className="user-head-btn-components">
      {isLogined ?
        <Dropdown menu={{ items }}>
          <div>
            <span className="user-head-btn-name">{userName}</span>
            <Avatar
              shape="square"
              icon={<UserOutlined />}
            />
          </div>
        </Dropdown> :
        <div className="inline-block">
          <span className="login-btn" onClick={goLogin}>登录/注册</span>
        </div>}
    </div>
  )
}

export default UserHeadBtn;