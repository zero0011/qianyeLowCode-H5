import React from "react";
import "./app.less";
import { Switch } from "react-router";
import routes, { NestedRoute } from './router';

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Hello World</h1>
      </header>

      

      <Switch>
        {/* 配置路由 */}
        {routes.map((route, i) => <NestedRoute {...route} key={i} />)}
      </Switch>
    </div>
  );
}
