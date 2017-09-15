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

//const pgpool = new Pool({
//  connectionString: connectionString,
// });
// to connect simply do pgclient.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET simple test to see if connection to database works by getting the current time */
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

/* Updates mock document as linked to user id #1 */
router.get('/mock-documents', function(req, res, next) {
  // get the md files
  var files = [];
  files.push('./tests/article1.md');
  files.push('./tests/article2.md');
  files.push('./tests/article3.md');
  files.push('./tests/article4.md');
  files.push('./tests/article5.md');

  var createQuery = function(filePath) {
    var fs = require('fs');
    var data = fs.readFileSync(filePath, 'utf8');
    var query = 'update documentmd set mddata = ? where id = ?';
    return { "content": data, "query": query };
  };

  var outputData = [];

  for (var f=0;f<files.length;f++) {
    outputData.push(createQuery(files[f]));
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(outputData) );
});

module.exports = router;
