import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from 'antd'
import { Modal } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 获取个人信息
  const showModal = () => setIsModalOpen(true);
  const hiddenModal = () => setIsModalOpen(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span className="dropdown-item" onClick={showModal}>个人信息</span>
      ),
    },
    {
      key: '2',
      label: (
        <span className="dropdown-item" onClick={doLogout}>退出登录</span>
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
      <Modal title="个人信息"
        open={isModalOpen}
        onCancel={hiddenModal}
        footer={null}
        width={400}
      >
        <p>
          <span>昵称： </span>
          <span className="inline-block marginL20">{userName}</span>
        </p>
        <p>
          <span>用户名： </span>
          <span className="inline-block marginL20">{userInfo.username || ''}</span>
        </p>
        <p>
          <span>邮箱： </span>
          <span className="inline-block marginL20">{userInfo.email || ''}</span>
        </p>
        <p>
          <span>注册时间： </span>
          <span className="inline-block marginL20">{userInfo.created || ''}</span>
        </p>
      </Modal>
    </div>
  )
}

export default UserHeadBtn;