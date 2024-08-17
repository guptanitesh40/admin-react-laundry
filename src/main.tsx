import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/utils/store';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { AppRoutes } from './app/routing/AppRoutes';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} />
  </Provider>
);
