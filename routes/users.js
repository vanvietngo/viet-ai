var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/open-ai', function(req, res, next) {
  const body = {
    name: "APT",
    description: "Example for Open AI"
  }
  res.send(body);
});

module.exports = router;
