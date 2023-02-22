var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hire', { title: 'Brigthfield Tech Academy' });
});

module.exports = router;
