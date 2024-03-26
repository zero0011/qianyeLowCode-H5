import React, { useState, useEffect } from 'react'

import { getMyPages } from '@/api';

function Index() {

  useEffect(() => {
    getMyPages({
      'type': 'my',
      'pageMode': 'h5'
    }).then(() => {

    }).catch((err: any) => {
      console.log(err)
    })
  }, []) // 空数组确保这个effect只在组件挂载时运行一次

  return (
    <>
      <div>click</div>
    </>
  )
}

export default Index;