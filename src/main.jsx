import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import idID from 'antd/locale/id_ID';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import App from './App.jsx';
import './index.css';

dayjs.locale('id');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={idID}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
