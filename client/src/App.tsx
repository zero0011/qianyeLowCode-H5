import React, { useState, Suspense, useEffect } from "react";
import { Layout } from 'antd'
import "./app.less";
import Header from "@/components/Header";
import SiderMenusRoute from "@/router/SiderMenusRoute"
import ContentRoute from "@/router/index"
import NProgress from 'nprogress';
import { useHistory } from "react-router";


const { Footer, Content, Sider } = Layout

export default function App() {
  let [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  // 进度条
  useEffect(() => {
    const unlisten = history.listen((location) => {
      NProgress.start(); // 开始进度条
      const timerId = setTimeout(() => {  
        NProgress.done(); // 结束进度条  
        // 清除定时器  
      }, 200);
      return () => clearTimeout(timerId);
    });

    return () => unlisten();
  }, [history]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />

      <Layout style={{ paddingTop: '64px' }}>
        <Sider
          width={200}
          style={{ background: '#fff' }}
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          className="fixed"
          theme="light"
        >
          <SiderMenusRoute />
        </Sider>
        <Layout className={collapsed ? 'content-normal' : 'content-max'}>
          <Content style={{ margin: 0, minHeight: 280 }}>
            {/* Suspense处理懒加载的异步问题 */}
            <Suspense>
              <ContentRoute />
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <a href="https://github.com/zero0011/qianyeLowCode-H5">
              Fork me on Github
            </a>
            , Mixed by zero0011 @2024, currently under developing...
          </Footer>
        </Layout>
      </Layout>

    </Layout>
  );
}