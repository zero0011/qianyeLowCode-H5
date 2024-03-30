import React, { FC, useState, useEffect, useMemo } from "react";
import { getPageDetail } from "@/api";
import { baseURL } from "@/config";
import previewWrapper from "@/components/previewWrapper";

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

  return (
    <div></div>
  )
}

export default PreviewPage;