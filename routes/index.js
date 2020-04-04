var express = require('express');
var router = express.Router();
const _ = require("lodash");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("lodash", _);
  var a = [{name: "zhang", type: 1}, {name: "zhang", type: 2}, {name: "wang", type :1}];
  var b = _.keyBy(a, "name");
  console.log("BBBBB:::", b);

  res.render('index', { title: 'Express' });
});

module.exports = router;
