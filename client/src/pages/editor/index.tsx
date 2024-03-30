import React, { useState } from "react";
import { Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import { UnorderedListOutlined, BookOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import ComponentLibs from "@/components/ComponentLibs";
import PageManage from "@/components/PageManage";
import TemplateLibs from "@/components/TemplateLibs";

// 定义 Editor 组件的 props 类型  
interface EditorProps {
   
}

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

  const [activeSideBar, setActiveSideBar] = useState('componentLibs');

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