// router/index.js
import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import(/* webpackChunkName: 'index' */ "@/pages/Index"));
const About = lazy(() => import(/* webpackChunkName: 'about' */ "@/pages/About"));

const routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/page" />} />
    <Route exact path="/page" component={Home} />
    <Route exact path="/page-list" component={About} />
  </Switch>
)


export default routes