import log4js from 'log4js';

log4js.configure({
  appenders: { 
    out: { type: 'console' },
    allLog: { 
      type: "file", filename: "../log/all.log", maxLogSize: 10485760, backups: 3, keepFileExt: true
    },
    httpLog: { 
      type: "dateFile", filename: "../log/http.log", pattern: ".yyyy-MM-dd", keepFileExt: true 
    },
    errorLog: { 
      type: 'file', filename: '../log/error.log'
    },
    error: { 
      type: "logLevelFilter", level: "error", appender: 'errorLog' 
    }
  },
  categories: { 
    http: { 
      appenders: ['out', 'httpLog'], 
      level: "debug" 
    },
    default: { 
      appenders: ['out', 'allLog', 'error'], 
      level: 'debug' 
    }
  }
})

const logger = log4js.getLogger();
const httpLog = log4js.getLogger('http');
const httpLogger = log4js.connectLogger(httpLog, { level: 'WARN' });

export {
  logger, httpLogger
}