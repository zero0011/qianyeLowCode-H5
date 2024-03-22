// router/index.js
import React, { lazy } from 'react'

const routes = [
  {
    path: "/",
    name: "Layout",
    component: lazy(() => import(/* webpackChunkName: 'index' */ "@/pages/Index")),
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import(/* webpackChunkName: 'login' */"@/pages/Login")),
  }
];

export default routes