import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import qs from 'qs';

const baseURL = 'api';
const timeout = 80000;

const config: AxiosRequestConfig = {
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {},
  data: {}
  // withCredentials: false, // 跨域请求时是否需要使用凭证
  // responseType: 'json' // 服务器响应的数据类型,可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
};

const instance: AxiosInstance = axios.create(config);

// 请求拦截
instance.interceptors.request.use(
  config => {
    let _config = checkUrl(config);
    _config = checkContentType(_config);
    return _config;
  },
  error => {
    return Promise.reject(error);
  }
);

const get = (getConfig: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    instance({ method: 'get', ...getConfig }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

const post = (postConfig: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    instance({ method: 'post', ...postConfig }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

function checkUrl(config: AxiosRequestConfig) {
  if (config.url && config.url.slice(0, 1) !== '/') {
    config.url = '/' + config.url;
  }
  return config;
}

function checkContentType(config: AxiosRequestConfig) {
  if (
    config.data &&
    Object.keys(config.data).length > 0 &&
    config.headers &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data);
  }
  return config;
}

export {
  get,
  post
};
