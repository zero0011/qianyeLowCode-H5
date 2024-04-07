import React, { FC } from "react"

interface QkTextType {
  text: string,
  style: any
  className: string
}

const QkText: FC<QkTextType> = ({ text = '这是一段文字', style, className }) => {
  return (
    <div className={`qk-text ${className}`} style={{...style, height: '40px'}}>
      {text}
    </div>
  )
}

QkText.defaultProps = { text : '这是一段文字' }

export default QkText;