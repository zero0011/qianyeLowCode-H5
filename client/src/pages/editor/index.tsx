import React, { useEffect, useState } from "react";
import { Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import { UnorderedListOutlined, BookOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import ComponentLibs from "@/pages/Editor/components/ComponentLibs";
import PageManage from "@/pages/Editor/components/PageManage";
import TemplateLibs from "@/pages/Editor/components/TemplateLibs";
import { getPageDetail } from "@/api";
import { useLocation } from "react-router";

// 定义 Editor 组件的 props 类型  
interface EditorProps {}

const items: TabsProps['items'] = [
  {
    key: 'componentLibs',
    label: 
    <Tooltip title="组件列表" placement="right">
      <UnorderedListOutlined />
    </Tooltip>
  },
  {
    key: 'pageManage',
    label:
    <Tooltip title="页面管理" placement="right">
      <BookOutlined />
    </Tooltip>
  },
  {
    key: 'templateLibs',
    label:
    <Tooltip title="模板库" placement="right">
      <CodeSandboxOutlined />
    </Tooltip>
  },
];

const Editor: React.FC<EditorProps> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [id, setId] = useState(searchParams.get('id'));
  const [activeSideBar, setActiveSideBar] = useState('componentLibs');

  const initPageData = async () => {
    try {
      const res = await getPageDetail({ pageId: id });
      // TODO: redux
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    initPageData();
  }, [id])

  return (
    <div className="page-editor editor-wrapper">

      {/* 左侧导航 */}
      <div className="editor-side-bar">
        <Tabs
          defaultActiveKey={activeSideBar}
          tabPosition="left"
          items={items}
          onChange={(key) => setActiveSideBar(key)}
        />
      </div>

      {/* 组件&页面&模板 */}
      <div className="editor-page-edit-wrapper">
        {activeSideBar === 'componentLibs' && <ComponentLibs />}
        {activeSideBar === 'pageManage' && <PageManage />}
        {activeSideBar === 'templateLibs' && <TemplateLibs />}
      </div>

    </div>
  )
}

export default Editor;