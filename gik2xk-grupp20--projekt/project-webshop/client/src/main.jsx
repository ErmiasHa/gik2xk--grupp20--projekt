import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';


import App from './App.jsx';
import Admin from './views/Admin.jsx';
import Products from './views/Products.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import ProductEdit from './views/EditProduct.jsx';
import Cart from './views/Cart.jsx';
import Auth from './views/Auth.jsx';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme'; // Importera ditt skräddarsydda tema här

import NewProduct from './views/NewProduct.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/products' /> },

      { path: '/admin', element: <Admin /> },
      { path: '/auth', element: <Auth /> },
      { path: '/cart', element: <Cart /> },
      { path: '/products/:id/edit', element: <ProductEdit /> },
      { path: '/products/new', element: <NewProduct /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <ProductDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Lägg till ThemeProvider här */}
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CssBaseline /> {/* CssBaseline kan vara inom ThemeProvider för att tillämpa temat på den */}
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);