import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from "react-router-dom";

const root = document.getElementById('root');
if(root) {
  createRoot(root).render(
    <HashRouter>
      <App />
    </HashRouter>
  )
}
