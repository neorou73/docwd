var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a document resource');
});

router.get('/new', function(req, res, next) {
  var htmlData = '<form method="post">';
  htmlData += '<div><input name="documentTitle"></input></div>';
  htmlData += '<div><textarea name="documentData"></textarea></div>';
  htmlData += '<div><input type="submit" value="save"/></div>';
  htmlData += '</form>';
  res.send(htmlData);
});

router.post('/new', function(req, res, next) {
  // console.log(req.body);
  var returnData = req.body;
  var query = 'insert into documentmd (ownerid, mddata, title) values (?,?,?)';
  returnData['query'] = query;
  res.json(returnData);
});

module.exports = router;
