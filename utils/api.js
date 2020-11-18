import axios from 'axios';

const env = process.env.NODE_ENV;
const host = {
  mock: '',
  development: 'http://172.16.5.121:12306',
  production: '',
};

export const service = axios.create({
  // baseURL: host[env],
  timeout: 60000,
});

let reqInfoStr = '';
service.interceptors.request.use( config => {
  reqInfoStr = cacheReqInfo(config);

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
    const err = {
      message: error.message,
      info: reqInfoStr
    }
    // TODO 展示请求错误的 tips
    // tips.closeTips().showError(`网络错误<br/>错误码${error.code}`);
    return Promise.reject(err);
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

/**
 * 获取请求相关配置，用于错误请求时，log相关的数值
 * @param {koa config} config 
 */
function cacheReqInfo(config) {
  if (!config) return '';
  if (Object.keys(config).length === 0) return '';

  const { url, method, data, headers } = config;
  return `url: ${url} & method: ${method} & data: ${JSON.stringify(data)} & headers: ${JSON.stringify(headers)}}`;
}
