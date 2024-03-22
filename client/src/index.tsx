import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter  } from "react-router-dom";
// TODO redux
import { Provider } from "react-redux";

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
