import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ThumbnailPanel from '@/components/ThumbnailPanel';
import { getMyPages } from '@/api';

const items: TabsProps['items'] = [
  {
    key: 'h5',
    label: <span className="nav-tabs-label">H5</span>,
  },
  {
    key: 'longPage',
    label: <span className="nav-tabs-label">长页H5</span>,
  }
];

interface pageListItem {
  coverImage: string;
  isPublish: boolean;
  title: string;
  _id: string;
}

function Index() {

  const [myCount, setMyCount] = useState(8);
  const [shareCount, setShareCount] = useState(10);
  const [pageList, setPageList] = useState([]);

  const [searchParams, setSearchParams] = useState({
    type: 'my',
    pageMode: 'h5'
  });

  const getPageList = () => {
    getMyPages(searchParams)
      .then((res: any) => {
        setPageList(res.body.pages || []);
        setMyCount(res.body.myPageCount);
        setShareCount(res.body.myCooperationPageCount);
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  useEffect(() => getPageList(), [searchParams]); // 在组件首次挂载和searchParams变化时执行

  const onChange = (key: string) => {
    setSearchParams({
      ...searchParams,
      pageMode: key
    })
  };

  const doSearch = (type: string) => {
    setSearchParams({
      ...searchParams,
      type
    })
  }

  // 操作按钮类型，分为我的，我的协作，和已发布的三种状态
  const operationBtn = (isPublished: boolean) => {
    let baseBtn = ['edit', 'copyTemplate', 'setTemplate'];
    if (searchParams.type === 'my') {
      baseBtn = [...baseBtn, 'cooperation', 'delete']
    }
    if (searchParams.type === 'cooperation') {
      baseBtn = [...baseBtn, 'unCooperation']
    }
    if (isPublished) {
      baseBtn = [...baseBtn, 'copyUrl', 'viewPageData']
    } else {
      baseBtn = [...baseBtn, 'publish']
    }
    return baseBtn;
  }

  return (
    <div className="clearfix my-page-list">
      <div className="page-search-wrapper bg-white">
        <Tabs defaultActiveKey="1" type="card" tabBarGutter={20} items={items} onChange={onChange} />

        <div className="page-content">
          <div className="my-page-nav-list">
            <div className={`my-page-nav-item ${searchParams.type === 'my' ? 'active' : ''}`} onClick={() => doSearch('my')}>
              我的作品({myCount})
            </div>
            <div className={`my-page-nav-item ${searchParams.type === 'cooperation' ? 'active' : ''}`} onClick={() => doSearch('cooperation')}>
              参与作品({shareCount})
            </div>
          </div>

          {/* 页面列表 */}

          <div className="page-item-wrapper">
            {/* 创建页面 */}
            <div className="page-item">
              <ThumbnailPanel pageType={searchParams.pageMode} />
            </div>

            {/* 已有页面 */}
            {pageList.map((item: pageListItem) => {
              return (
                <div className="page-item" key={item._id}>
                  <ThumbnailPanel
                    pageData={item}
                    btnList={operationBtn(item.isPublish)}
                    getPageList={getPageList}
                  />
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;