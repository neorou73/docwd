var express = require('express');
// var bodyParser = require('body-parser');
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
  res.send('respond with a document resource');
});

router.get('/new', function(req, res, next) {
  var htmlData = '<form method="post">';
  /*htmlData += '<div><input name="documentTitle"></input></div>';
  htmlData += '<div><textarea name="documentData"></textarea></div>';
  htmlData += '<div><input type="submit" value="save"/></div>';
  htmlData += '</form>';
  */
  res.render('documentnew', { title: 'Record New Document'});
  res.send(htmlData);
});

// process form above
router.post('/new', function(req, res, next) {
  const pgclient = new Client({
    connectionString: connectionString,
  });
  pgclient.connect();
  var sqlQuery = 'insert into documentmd (ownerid, mddata, title) values ($1,$2,$3)';
  var bodyParams = req.body;
  pgclient.query(sqlQuery, [1,bodyParams.documentData,bodyParams.documentTitle], (err, result) => {
    // console.log(err, res)
    pgclient.end();
    if (result.rowCount == 1) {
      var success = 'Document successfully saved';
      success += JSON.stringify(result);
      res.send(success);
    } else {
      res.send('Document was not saved.');
    }
  });

});


router.get('/list', function(req, res, next) {
  const pgclient = new Client({
    connectionString: connectionString,
  });
  pgclient.connect();
  var sqlQuery = 'select * from documentmd';
  var bodyParams = req.body;
  pgclient.query(sqlQuery, [], (err, result) => {
    // console.log(err, res)
    pgclient.end();
    // res.send(JSON.stringify(result));
    res.render('documentslist', { title: 'Documents In Database', doclist: result.rows });
  });
});


router.get('/:id', function(req, res, next) {
  const pgclient = new Client({
    connectionString: connectionString,
  });
  pgclient.connect();
  var reqParams = req.params;
  if (reqParams.hasOwnProperty('id')) {
    var sqlQuery = 'select * from documentmd where id = $1';
    pgclient.query(sqlQuery, [reqParams.id], (err, result) => {
      // console.log(err, res)
      pgclient.end();
      var markdown = require( "markdown" ).markdown;
      if (result.rowCount == 1) {
        // res.send(JSON.stringify(result));
        // console.log( markdown.toHTML( "Hello *World*!" ) );
        // res.send(JSON.stringify(result));
        var innerHtml = markdown.toHTML(result.rows[0].mddata);
        var outputData = '<!DOCTYPE HTML><html><title>' + result.rows[0].title + '</title><body>' + innerHtml + '</body></html>';
        res.send(outputData);
      } else {
        res.send('Error: Not able to find one result');
      }
    });
  } else {
    req.send('Error: requires valid ID');
  }
});





/*
router.post('/new', function(req, res, next) {
  // console.log(req.body);
  var returnData = req.body;
  var query = 'insert into documentmd (ownerid, mddata, title) values (?,?,?)';
  returnData['query'] = query;
  res.json(returnData);
});
*/

module.exports = router;
