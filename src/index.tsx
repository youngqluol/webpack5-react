import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';

import './style/reset.css';
import 'antd/dist/antd.css';
import './style/global.less';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
