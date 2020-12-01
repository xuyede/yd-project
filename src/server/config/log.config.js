import log4js from 'log4js';
import log4jsPolyfill from '../middlewares/connect_log';
import path from 'path';

const log = path.join(__dirname, '..', 'log');

log4js.configure({
  replaceConsole: true,
  appenders: { 
    out: { type: 'stdout' },
    allLog: { 
      type: "file", filename: `${log}/all.log`, maxLogSize: 10485760, backups: 3, keepFileExt: true
    },
    httpLog: { 
      type: "file", filename: `${log}/http.log`, pattern: ".yyyy-MM-dd"
    },
    errorLog: { 
      type: 'file', filename: `${log}/error.log`
    },
    error: { 
      type: "logLevelFilter", level: "error", appender: 'errorLog' 
    }
  },
  categories: { 
    http: { 
      appenders: ['out', 'allLog', 'httpLog'], 
      level: "all" 
    },
    default: { 
      appenders: ['out', 'allLog', 'error'], 
      level: 'debug' 
    }
  }
})

const logger = log4js.getLogger();
const httpLog = log4js.getLogger("http");
const httpLogger = function(opt = {}) {
  return log4jsPolyfill(httpLog, { level: 'auto', nolog: opt.nolog || '\\.(gif|jpe?g|png|ico)$' });
}

export {
  logger, httpLogger
}