import { get } from './request';

// for test
export const testRequest = () => {
  return get({
    url: '/test',
  });
};
