import React from "react";
import "./app.less";
import { Switch, Route, NavLink } from "react-router-dom";
import routes from './router';
import { Button } from 'antd'


export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Hello World</h1>
      </header>
      
      <Switch>
        {/* 配置路由 */}
        
        {routes.map((route) => <Route exact {...route} />)}
      </Switch>
    </div>
  );
}
