import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import defaultCoverImage from '@/assets/imgs/quark--pagecover-image.png';
import { Button, Dropdown } from "antd";
import type { MenuProps } from 'antd'

interface pageData {
  coverImage: string
}

interface ThumbnailPanelProps {
  pageType?: string;
  pageData?: pageData;
}

const operationDataList = [{
  title: '发布',
  eventType: 'publish',
  extraClassName: '',
  iconClass: ''
}, {
  title: '发布模板市场',
  eventType: 'publishTemplate',
  extraClassName: '',
  iconClass: ''
}, {
  title: '复制链接',
  eventType: 'copyUrl',
  iconClass: ''
}, {
  title: '设为我的模板',
  eventType: 'setTemplate',
  iconClass: ''
}, {
  title: '页面数据',
  eventType: 'viewPageData',
  iconClass: ''
}, {
  title: '协作设置',
  eventType: 'cooperation',
  iconClass: ''
}, {
  title: '删除',
  eventType: 'delete',
  extraClassName: 'error',
  iconClass: ''
}, {
  title: '退出协作',
  eventType: 'unCooperation',
  extraClassName: 'error',
  iconClass: ''
}]

const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({ pageType, pageData }) => {

  const items: MenuProps['items'] = operationDataList.map((item, index) => (
    {
      key: `${index + 1}`,
      label: (
        <span className="dropdown-item">{item.title}</span>
      ),
      danger: item.extraClassName === 'error'
    }
  ))

  return (
    pageData ? 
    <div className="page-thumbnail-panel">
      <span className="unpublish">未发布</span>
      <div className="thumbnail-panel-cover">
        <div className="header-mask">
          <div className="details-btn">预览</div>
        </div>
        <div className="image-wrapper">
          <img src={pageData.coverImage || defaultCoverImage} alt="" />
        </div>
      </div>
      <div className="page-item-title border-T ellipsis">
        <span className="item-title-i" >{'未命名作品'}</span>
      </div>
      <div className="border-T thumbnail-panel-btn">
        <div className="btn-wrapper">
          <Button type="text" size="small">编辑</Button>
        </div>
        <div className="btn-wrapper">
          <Button type="text" size="small">复制</Button>
        </div>
        <div className="btn-wrapper">
          <Dropdown menu={{ items }}  placement="topLeft">
            <Button type="text" size="small">更多...</Button>
          </Dropdown>
        </div>
      </div>
    </div> :
    <div className="page-thumbnail-panel create">
      <div className="temp-create">
        <PlusOutlined/>
        <p className="paddingT10">新建页面</p>
      </div>
    </div>
  );
};

export default ThumbnailPanel;