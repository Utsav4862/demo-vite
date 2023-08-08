import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.jsx'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiSlice } from './store/slices/apiSlice.jsx'
import Product from './components/Product.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ApiProvider api={apiSlice}>
      {/* <Product /> */}
      <App />
    </ApiProvider>
  </Provider>
)

