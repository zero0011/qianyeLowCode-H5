import React, { useState, useEffect } from 'react'

import { getMyPages } from '@/api';

function Index() {

  const [searchParams, setSearchParams] = useState({
    type: 'my',
		pageMode: 'h5'
  })
  
  useEffect(() => {   
    getMyPages(searchParams)
      .then((data: any) => {
        console.log(data)
      })
      .catch((err: any) => {
        console.log(err)
      })   
  }, []); // 在组件首次挂载时执行  

  return (
    <>
      <div>click</div>
    </>
  )
}

export default Index;