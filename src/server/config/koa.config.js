import path from 'path';

let config = {
  viewDir: path.join(__dirname, '..', 'views'),
  staticDir: path.join(__dirname, '..', 'assets')
}

if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    port: '12306',
    viewCache: false
  };

  config = { ...config, ...devConfig };
}

if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    port: '80',
    viewCache: 'momery'
  };

  config = { ...config, ...prodConfig };
}

export default config;