var express = require('express');
const router = express.Router();
var path = require("path")
var formsController  = require("../controllers/email")
require("dotenv").config()

// const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars')
var sgMail = require('@sendgrid/mail');



 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Brigthfield Tech Academy' });
});




router.post('/', formsController.userForms);


module.exports = router;
