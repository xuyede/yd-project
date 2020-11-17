import axios from 'axios';

const env = process.env.NODE_ENV;
const host = {
  mock: 'http://mock.fe.jyb.com/mock-api/mock/5f06daf5a4f6fa5db18baced',
  development: 'http://172.16.5.121:12306',
  production: '',
};

export const service = axios.create({
  // baseURL: host[env],
  timeout: 60000,
});

service.interceptors.request.use( config => {
  logger.info('test http')
  let token;
  // TODO 配置token
  if (token) {
    config.headers.token = token;
  }
  // TODO 展示加载中的 tips
  return config;
});

service.interceptors.response.use(
  res => {
    // TODO 关闭加载中的 tips
    const resData = res.data;
    if (res.status >= 200 && res.status < 300) return resData;
    return Promise.reject(resData);
  },
  error => {
    // TODO 展示请求错误的 tips
    // tips.closeTips().showError(`网络错误<br/>错误码${error.code}`);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(res => {
  const { code, msg } = res;
  if (code != 0) {
    // TODO 展示请求错误的 tips
    // EventBus.$emit('showError', msg);
    return Promise.reject(res);
  }
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data: res.data
  });
});
