import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './Store/ProductSlice.jsx'
import { Provider } from 'react-redux';

const store = configureStore({
  reducer : {
    product : ProductSlice
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  
)
