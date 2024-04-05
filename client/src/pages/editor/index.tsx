import React, { useEffect, useState } from "react";
import { Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import { UnorderedListOutlined, BookOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import ComponentLibs from "@/pages/Editor/components/ComponentLibs";
import PageManage from "@/pages/Editor/components/PageManage";
import TemplateLibs from "@/pages/Editor/components/TemplateLibs";
import { getPageDetail } from "@/api";
import { useLocation } from "react-router";
import ControlBar from "./components/ControlBar";
import EditorPan from "./components/EditorPan";
import { useDispatch } from "react-redux";
import { setPrjectData } from "@/redux/editor/actions";

// 定义 Editor 组件的 props 类型
interface EditorProps {}

const navigateItems: TabsProps['items'] = [
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

const propertyItems: TabsProps['items'] = [
  {
    key: 'attr',
    label: '属性',
    children: 'Content of Tab Pane 1',
  },
  {
    key: 'event',
    label: '事件',
    children: 'Content of Tab Pane 2',
  },
  {
    key: 'animation',
    label: '动画',
    children: 'Content of Tab Pane 3',
  },
  {
    key: 'script',
    label: 'JS脚本',
    children: 'Content of Tab Pane 3',
  },
  {
    key: 'pageAttr',
    label: '页面设置',
    children: 'Content of Tab Pane 3',
  },
];

const Editor: React.FC<EditorProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="page-editor editor-wrapper">

      {/* 左侧导航 */}
      <div className="editor-side-bar">
        <Tabs
          defaultActiveKey={activeSideBar}
          tabPosition="left"
          items={navigateItems}
          onChange={(key) => setActiveSideBar(key)}
        />
      </div>

      {/* 组件&页面&模板 */}
      <div className="editor-page-edit-wrapper">
        {activeSideBar === 'componentLibs' && <ComponentLibs />}
        {activeSideBar === 'pageManage' && <PageManage />}
        {activeSideBar === 'templateLibs' && <TemplateLibs />}
      </div>

      {/* 页面编辑区域 */}
      <div className="editor-main">
        <div className="control-bar-wrapper">
          <ControlBar />
        </div>

        <EditorPan />
      </div>

      {/* 属性编辑区域 */}
      <div className="el-attr-edit-wrapper scrollbar-wrapper">
        <div className="el-tabs-container">
          <Tabs defaultActiveKey="attr" items={propertyItems} onChange={onChange} />
        </div>
      </div>

      {/* 预览 */}


    </div>
  )
}

export default Editor;