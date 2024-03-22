// router/index.js
import React, { lazy } from 'react'
import Index from '@/pages/Index'

const routes = [
  {
    path: "/",
    element: Index,
  },
  // {
  //   path: "/about",
  //   element: lazy(() => import('@/pages/About'))
  // }
];

export default routes
