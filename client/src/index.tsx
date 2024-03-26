import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from './router/PrivateRoute';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <Suspense>
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/notFound' exact component={NotFound} />
            {/* 判断token进行路由拦截 */}
            <PrivateRoute path='*' exact component={App} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}
