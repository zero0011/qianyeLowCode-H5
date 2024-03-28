import React from "react";

interface ThumbnailPanelProps {  
  pageType: string;  
}

const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({ pageType }) => {  
  return (
    <div>  
      <h3>子组件</h3>
      <p>从父组件接收的数据: {pageType}</p>
    </div>
  );
}; 

export default ThumbnailPanel;