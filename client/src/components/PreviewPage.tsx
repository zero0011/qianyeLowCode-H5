import React, { FC } from "react";

interface PreviewPageProps {
  pageId: string
  closePreview: Function
}

const PreviewPage: FC<PreviewPageProps> = ({
  pageId,
  closePreview
}) => {
  return (
    <div>{pageId}</div>
  )
}

export default PreviewPage;