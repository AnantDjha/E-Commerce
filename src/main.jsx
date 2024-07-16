import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ProductProvider } from './context/ProductContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductProvider>
    <UserProvider>
    <App />
    </UserProvider>
  </ProductProvider>
);
