import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import defaultCoverImage from '@/assets/imgs/quark--pagecover-image.png';
import { Button, Dropdown } from "antd";
import type { MenuProps } from 'antd'
import DataModel from "@/pages/Editor/DataModel";
import { createPage, copyPage, deletePage } from "@/api";
import { errorMessage, successMessage } from "@/utils";
import { useHistory } from "react-router";

interface pageData {
  coverImage: string
  _id: string
  isPublish: boolean
  title: string
}

interface ThumbnailPanelProps {
  pageType?: string;
  pageData?: pageData;
  showPublishState?: boolean;
  btnList?: Array<any>;
  getPageList?: Function
  showPreview?: Function
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

const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({
  pageType,
  pageData,
  showPublishState = true,
  btnList,
  getPageList,
  showPreview
}) => {
  const history = useHistory();

  // 新建页面
  const newPage = () => {
    const newPageData = DataModel.getProjectConfig();
    createPage({...newPageData})
      .then((res: any) => {
        if (res.body) {
          history.push(`/editor?id=${res.body._id}`);
        }
      })
      .catch((err) => {
        errorMessage(err);
      })
  }

  // 编辑
  const edit = () => {
    history.push(`/editor?id=${pageData?._id}`);
  }

  const handCopyPage = () => {
    copyPage({ id: pageData?._id })
      .then((res: any) => {
        history.push(`editor?id=${res.body._id}`)
      })
      .catch((err) => {
        errorMessage(err);
      })
  }

  // 预览
  const preview = (id: string) => {
    showPreview && showPreview(id)
  }

  const deleteTemplate = async () => {
    await deletePage({ id: pageData?._id })
    successMessage('删除成功！');
    // 重新获取列表
    getPageList && getPageList()
  }

  const command = (eventType: string) => {
    switch(eventType) {
      case 'delete':
        deleteTemplate();
        break
    }
  }

  const items: MenuProps['items'] = operationDataList
    .filter((item) => btnList?.includes(item.eventType))
    .map((item, index) => (
      {
        key: `${index + 1}`,
        label: (
          <span className="dropdown-item" onClick={() => command(item.eventType)}>{item.title}</span>
        ),
        danger: item.extraClassName === 'error'
      }
    ))

  return (
    pageData ? 
    <div className="page-thumbnail-panel">
      {!pageData.isPublish && showPublishState && <span className="unpublish">未发布</span>}
      <div className="thumbnail-panel-cover">
        <div className="header-mask">
          <div className="details-btn" onClick={() =>preview(pageData._id)}>预览</div>
        </div>
        <div className="image-wrapper">
          <img src={pageData.coverImage || defaultCoverImage} alt="" />
        </div>
      </div>
      <div className="page-item-title border-T ellipsis">
        <span className="item-title-i" >{pageData.title || '未命名作品'}</span>
      </div>
      {btnList?.length && <div className="border-T thumbnail-panel-btn">
        {btnList.includes('edit') && <div className="btn-wrapper">
          <Button type="text" size="small" onClick={edit}>编辑</Button>
        </div>}
        {btnList.includes('useTemplate') && <div className="btn-wrapper">
          <Button type="text" size="small">使用模板</Button>
        </div>}
        {btnList.includes('copyTemplate') && <div className="btn-wrapper">
          <Button type="text" size="small" onClick={handCopyPage}>复制</Button>
        </div>}
        <div className="btn-wrapper">
          <Dropdown menu={{ items }}  placement="topLeft">
            <Button type="text" size="small">更多...</Button>
          </Dropdown>
        </div>
      </div>}
    </div> :
    <div className="page-thumbnail-panel create">
      <div className="temp-create" onClick={newPage}>
        <PlusOutlined/>
        <p className="paddingT10">新建页面</p>
      </div>
    </div>
  );
};

export default ThumbnailPanel;