var express = require('express');
var router = express.Router();

// load docwd configuration file, check for config.json first, if not use config.default.json
var docwdConfig = require('../config.default.json');
var pg = require('pg');

// console.log(docwdConfig['database']['host']); // test that this is read properly
const { Pool,  Client } = require('pg');

const dbuser = docwdConfig['database']['user'];
const dbpassword = docwdConfig['database']['password'];
const dbhost = docwdConfig['database']['host'];
const dbport = docwdConfig['database']['port'];
const dbname = 'docwd';

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const connectionString = 'postgresql://' + dbuser + ':' + dbpassword + '@' + dbhost + ':' + dbport + '/' + dbname;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET simple test to see if connection to database works by getting the current time */
/*
// example
router.get('/test', function(req, res, next) {
  const pgclient = new Client({
    connectionString: connectionString,
  });

  pgclient.connect();

  pgclient.query('SELECT NOW()', (err, result) => {
    // console.log(err, res)
    pgclient.end();
    res.send(JSON.stringify(result));
  });

});
*/

module.exports = router;
