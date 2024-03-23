import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import { Provider } from "react-redux";

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <Suspense>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/notFound' exact component={NotFound}></Route>
          <App />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
