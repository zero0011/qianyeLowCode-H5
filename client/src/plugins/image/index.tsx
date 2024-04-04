import React, { FC } from "react"

interface QkImageType {
  imageSrc: string
}

const QkImage: FC<QkImageType> = ({ imageSrc = 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg' }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <img src={imageSrc} alt="" />
    </div>
  )
}

QkImage.defaultProps = { imageSrc: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg' }

export default QkImage;