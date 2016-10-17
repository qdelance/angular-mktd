var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {
  target: 'http://ilaborie.org:9010/',
  changeOrigin: true   // for vhosted sites
});

module.exports = {
  server: {
    middleware: {
      1: apiProxy
    }
  }
};
