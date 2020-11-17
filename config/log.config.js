import log4js from 'log4js';
import path from 'path';
const log = path.join(__dirname, '..', 'log');
const getKoaLogger = require('koa-log4js');

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
      appenders: ['httpLog'], 
      level: "all" 
    },
    default: { 
      appenders: ['out', 'allLog', 'error'], 
      level: 'debug' 
    }
  }
})

const logger = log4js.getLogger();
const httpLog = log4js.getLogger('http');
const httpLogger = getKoaLogger();

export {
  logger, httpLogger
}