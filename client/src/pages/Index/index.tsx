import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ThumbnailPanel from '@/components/ThumbnailPanel';
import { getMyPages } from '@/api';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <span className="nav-tabs-label">H5</span>,
  },
  {
    key: '2',
    label: <span className="nav-tabs-label">长页H5</span>,
  }
];

function Index() {

  const [myCount, setMyCount] = useState(8);
  const [shareCount, setShareCount] = useState(10);

  const [searchParams, setSearchParams] = useState({
    type: 'my',
		pageMode: 'h5'
  }); 
  
  useEffect(() => {   
    getMyPages(searchParams)
      .then((data: any) => {
        console.log(data)
      })
      .catch((err: any) => {
        console.log(err)
      })   
  }, []); // 在组件首次挂载时执行  

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="clearfix my-page-list">
      <div className="page-search-wrapper bg-white">
        <Tabs defaultActiveKey="1" type="card" tabBarGutter={20} items={items} onChange={onChange} />

        <div className="page-content">
          <div className="my-page-nav-list">
            <div className={`my-page-nav-item ${searchParams.type === 'my' ? 'active' : ''}`}>
              我的作品({myCount})
            </div>
            <div className={`my-page-nav-item ${searchParams.type === 'cooperation' ? 'active' : ''}`}>
              参与作品({shareCount})
            </div>
          </div>

          {/* 页面列表 */}

          <div className="page-item-wrapper">
            <div className="page-item">
              <ThumbnailPanel pageType={searchParams.pageMode}/>
            </div>
            <div className="page-item">
              <ThumbnailPanel pageType={searchParams.pageMode} pageData={{
                coverImage: ''
              }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;