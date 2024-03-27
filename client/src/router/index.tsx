// router/index.js
import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Page = lazy(() => import(/* webpackChunkName: 'index' */ "@/pages/Index"));
const About = lazy(() => import(/* webpackChunkName: 'about' */ "@/pages/About"));
const Template = lazy(() => import(/* webpackChunkName: 'template' */"@/pages/Template"));

const routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/page" />} />
    <Route exact path="/page" component={Page} />
    <Route exact path="/page-list" component={About} />
    <Route exact path="/template-list" component={Template} />
    {/* 未找到匹配路由 */}
    <Route path='*' render={() => <Redirect to="/notFound"/>}></Route>
  </Switch>
)


export default routes