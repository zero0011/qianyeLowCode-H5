import React, { FC, useState, useEffect, useMemo } from "react";
import { getPageDetail } from "@/api";
import { baseURL } from "@/config";
import PreviewWrapper from "@/components/PreviewWrapper";
import { Form, Button } from 'antd';
import QRCode from 'qrcode.react';
import { copyText, successMessage } from "@/utils";

interface PreviewPageProps {
  pageId: string
  closePreview: Function
}

// 定义一个接口来描述 pageData 的结构  
interface PageDataType {
  shareConfig?: {
    shareWx?: boolean;
    coverImage?: string;
    title?: string;
    description?: string;
  };
  coverImage?: string;
  title?: string;
  description?: string;
  isPublish?: boolean;
}

const PreviewPage: FC<PreviewPageProps> = ({
  pageId,
  closePreview
}) => {

  const [pageData, setPageData] = useState<PageDataType>({});
  const pageLink = useMemo(() => `${baseURL}/quark/view/${pageId}`, [pageId]);
  const shareData = useMemo(() => {
    if (!pageData.shareConfig) {
      return {};
    }
    if (pageData.shareConfig.shareWx) {
      return {
        coverImage: pageData.shareConfig.coverImage,
        title: pageData.shareConfig.title,
        description: pageData.shareConfig.description,
      };
    } else {
      return {
        coverImage: pageData.coverImage,
        title: pageData.title,
        description: pageData.description,
      };
    }
  }, [pageData])

  const getData = async () => {
    try {
      const res = await getPageDetail({ pageId });
      setPageData(res.body)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [pageId])

  const doCopy = () => {
    copyText(pageLink).then(() => {
      successMessage('已复制');
    })
  }

  return (
    <PreviewWrapper pageId={pageId} closePreview={closePreview}>
      <p className="page-title paddingL30">页面预览</p>
      <div className="preview-info-wrapper">
        <Form
          labelAlign='left'
          labelCol={{ span: 5 }}
        >
          <Form.Item label="页面二维码:">
            <QRCode value={pageLink} size={120} level="H" />
          </Form.Item>

          <Form.Item label="页面链接:">
            <Button type="primary" onClick={doCopy}>复制链接</Button>
            <div className="share-wx-config-wrapper">{pageLink}</div>
          </Form.Item>

          <Form.Item label="页面状态:">
            <span className={`${pageData.isPublish ? 'primary' : 'orange'}`}>
              {pageData.isPublish ? '已发布' : '未发布'}
            </span>
          </Form.Item>
        </Form>

        <div className="page-info">

          <div className="page-title-des paddingT10">
            <div className="info-form-wrapper">{pageData.title}</div>
          </div>

          <div className="info-form-wrapper ellipsis">{shareData.description}</div>
        </div>
      </div>

      <div className="clearfix paddingT30 text-center">
        <a href={pageLink} target="_blank">
          <Button type="primary">新标签打开链接</Button>
        </a>
      </div>
    </PreviewWrapper>
  )
}

export default PreviewPage;