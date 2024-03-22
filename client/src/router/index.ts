// router/index.js
import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";
import React, { lazy } from 'react'


const routes = [
  {
    path: "/index",
    component: lazy(() => import(/* webpackChunkName: 'index' */ "@/pages/Index")),
  }
];

export default routes

export {
  NestedRoute,
  StatusRoute
}

