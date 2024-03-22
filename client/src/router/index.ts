// router/index.js
import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";
import Login from "@/pages/About";
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
    component: Login,
    meta: {

    }
  }
];

export default routes

export {
  NestedRoute,
  StatusRoute
}

