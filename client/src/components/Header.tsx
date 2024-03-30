import React from 'react'
import { Layout } from 'antd'
import UserHeadBtn from "@/components/UserHeadBtn";

const { Header } = Layout

const RootHeader: React.FC = () => {

  const goHome = () => {
    // 刷新网站
    window.location.reload()
  }

  return (
    <Header className="header clearfix fixed center" >
      <div className="logo" onClick={goHome}>qianyeLowCode-H5</div>
      <div className="header-center-wrapper"></div>
      <div className="user-wrapper">
        <UserHeadBtn />
      </div>
    </Header>
  )
}

export default RootHeader;