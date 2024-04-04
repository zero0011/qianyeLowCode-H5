import React, { FC } from "react"

interface QkButtonType {
  text: string
}

const QkButton: FC<QkButtonType> = ({ text = '按 钮' }) => {
  return (
    <div className="qk-button">
      {text}
    </div>
  )
}

QkButton.defaultProps = { text : '按 钮' }

export default QkButton;