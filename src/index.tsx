// ie兼容问题：https://github.com/yaoningvital/blog/issues/140
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import 'react-app-polyfill/ie9';
import ReactDOM from 'react-dom';
import App from './pages/App';

import './style/reset.css';
// import 'antd/dist/antd.css';
import '@kdcloudjs/kdesign/dist/kdesign.css';
import './style/global.less';

ReactDOM.render(<App />, document.getElementById('root'));
