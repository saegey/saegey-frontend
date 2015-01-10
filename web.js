if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/build"));
app.listen(process.env.PORT || 5000);
