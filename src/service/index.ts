import { get } from './request';

// for test
export const testRequest = () => {
  return get({
    url: '/test',
  });
};

// 文件下载
export const downloadFile = () => {
  return get<Blob>({
    url: '/file/download',
    responseType: 'blob',
  });
};
