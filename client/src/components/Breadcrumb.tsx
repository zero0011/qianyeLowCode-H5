import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const RootBreadcrumb = ({ match }: any) => {
  return (
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>
        <Link to='1'>
          666
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default RootBreadcrumb