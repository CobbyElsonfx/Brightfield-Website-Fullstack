var express = require('express');
var router = express.Router();
var newsController = require("../controllers/newsFetch")

/* GET home page. */
router.get('/', newsController.fetchNews);

module.exports = router;
