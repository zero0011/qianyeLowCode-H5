import React from 'react'
import { Menu, Badge } from 'antd'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,
  TeamOutlined,
  PictureOutlined
} from '@ant-design/icons';

const SiderMenus: React.FC = ({ match }: any) => (
  <div style={{ paddingBottom: '120px' }}>
    <Menu
      theme="light"
      defaultSelectedKeys={[match.url]}
      selectedKeys={[match.url]}
      defaultOpenKeys={['sub4']}
      mode="inline"
    >
      <Menu.Item key="/page">
        <Link to="/page">
          <HomeOutlined />
          <span>首页</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/page-list">
        <Link to="/page-list">
          <PictureOutlined />
          <span>我的作品</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/template-list">
        <Link to="/template-list">
          <TeamOutlined />
          <span>创意模版</span>
        </Link>
      </Menu.Item>
    </Menu>
  </div>
)

export default SiderMenus
