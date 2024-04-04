import React, { FC } from "react"

interface QkTextType {
  text: string
}

const QkText: FC<QkTextType> = ({ text = '这是一段文字' }) => {
  return (
    <div className="qk-text" style={{ height: '40px' }}>
      {text}
    </div>
  )
}

QkText.defaultProps = { text : '这是一段文字' }

export default QkText;