import React, { useEffect, useState } from "react";
import { Tabs, Tooltip, Modal, Button } from 'antd';
import type { TabsProps } from 'antd';
import { UnorderedListOutlined, BookOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import ComponentLibs from "@/pages/Editor/components/ComponentLibs";
import PageManage from "@/pages/Editor/components/PageManage";
import TemplateLibs from "@/pages/Editor/components/TemplateLibs";
import { getPageDetail, updatePage } from "@/api";
import { useLocation, useHistory } from "react-router";
import ControlBar from "./components/ControlBar";
import EditorPan from "./components/EditorPan";
import { useDispatch, useSelector } from "react-redux";
import { setProjectDataAsync } from "@/redux/editor/asyncActions";
import Preview from "./components/Preview";
import { successMessage, errorMessage } from "@/utils";

// 定义 Editor 组件的 props 类型
interface EditorProps { }

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
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || '';
  const [activeSideBar, setActiveSideBar] = useState('componentLibs');
  const [scale, setScale] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectData = useSelector((state: any) => state.editor.projectData);

  const initPageData = async () => {
    try {
      const res = await getPageDetail({ pageId: id });
      dispatch(setProjectDataAsync({
        ...res.body
      }))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(setProjectDataAsync())
    initPageData();
  }, [id])

  const onChange = (key: string) => {
    
  };

  // 更新画板大小
  const updateScale = (type: string, value: number) => {
    let newScale = 0;
    if (type === 'plus') {
      newScale = scale + (value || 0.1) > 2 ? 2 : scale + (value || 0.1);
    } else if (type === 'reduce') {
      newScale = scale - (value || 0.1) > 0.5 ? scale - (value || 0.1) : 0.5;
    } else if (type === 'reset') {
      newScale = value || 1;
    }
    setScale(newScale);
  }

  const showPreviewFn = async () => {
    await updatePage({
      pageData: projectData
    })
    setShowPreview(true);
  }

  const cancelFn = () => {
    setIsModalOpen(true)
  }

  const publishFn = async () => {
    let data = { ...projectData, isPublish: true };
    try {
      await updatePage({
        pageData: data
      })
      successMessage('已成功保存并发布!');
      setShowPreview(false);
      history.push('/');
    } catch (err) {
      errorMessage('保存失败!');
    }
  }

  const saveFn = async () => {
    try {
      await updatePage({
        pageData: projectData
      })
      successMessage('保存成功!');
      setShowPreview(false)
    } catch (err) {
      errorMessage('保存失败!');
    }
  }

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
          <ControlBar
            scale={scale}
            updateScale={updateScale}
            showPreviewFn={showPreviewFn}
            cancelFn={cancelFn}
          />
        </div>

        <EditorPan scale={scale} />
      </div>

      {/* 属性编辑区域 */}
      <div className="el-attr-edit-wrapper scrollbar-wrapper">
        <div className="el-tabs-container">
          <Tabs defaultActiveKey="attr" items={propertyItems} onChange={onChange} />
        </div>
      </div>

      {/* 预览 */}
      {showPreview &&
        <Preview
          pageData={projectData}
          pageId={id}
          closePreview={() => setShowPreview(false)}
          publishFn={publishFn}
          saveFn={saveFn}
        />}


      {/* 退出提示 */}

      <Modal title="提示"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={400}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            history.push('/')
          }}>
            确定
          </Button>]}
      >
        <p>确认退出编辑?</p>
      </Modal>
    </div>
  )
}

export default Editor;