import React from "react";
import "./app.less";
import { Switch, NavLink, Route } from "react-router-dom";
import routes, { NestedRoute }  from './router';
import Index from '@/pages/Index';
import Login from '@/pages/About';


export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Hello World</h1>
      </header>

      <Switch>
        {/* 配置路由 */}
        <Route exact path='/' component={Index} />
        <Route exact path='/login' component={Login} />

        
      </Switch>
    </div>
  );
}
