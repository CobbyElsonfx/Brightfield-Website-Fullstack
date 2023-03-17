var express = require('express');
const router = express.Router();
var Person = require('../models/forms.js')
var path = require("path")
require("dotenv").config()
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
// const sgMail = require('@sendgrid/mail');



 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Brigthfield Tech Academy' });
});




router.post('/', function(req, res){
   // res.redirect("/contact")
   const {firstName,middleName,lastName,age,gender,email,phoneNumber,message} =req.body;  //destructuring from the req body
     
  Person.findOne({email:email} )
  .then(user=> {
    if(user){
      res.send(`<script>
                  alert("Email already exist."); 
                  window.location.href = "/contact"; 
               </script>`
               );
              } 
              
      else{

         var newPerson = new Person({
            firstName: firstName,
            middleName:middleName,
            lastName: lastName,
            age: age,
            gender: gender,
            email: email,
            phoneNumber: phoneNumber,
            message: message
         });
       
         newPerson.save(function(err, Person){
            if(err){
             console.log(err)
             res.redirect('contact', {message: "Database error", type: "error"});
           // res.send("err facing")
            }
               
            else{
             //   res.send("okay is working")
             res.render('contactsubmission', {email: email , phoneNumber: phoneNumber ,firstName:firstName , middleName:middleName ,lastName:lastName});
            //  console.log(process.env.SENDGRID_API_KEY)
            //  //after reander send email to client 
            
               sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                  to: `${email}`,
                  from: 'andohfrancis9187@gmail.com',
                  templateId: 'd-9869dcbdb55a47d2acdaa13934d5f550',
                  dynamicTemplateData: {
                     subject: 'Testing Templates',
                     name: `${firstName} ${ middleName} ${lastName}`,
                     city: 'Ghana',
                  },
                  };
                  sgMail.send(msg).then(()=>{
                     console.log("email sent successfully")
                  }).catch((err)=>{
                        console.log(err)
                  })



            //using nodemailer for sending messages

   //             const transporter = nodemailer.createTransport({
   //             service: 'gmail',
   //             auth: {
   //                user: 'andohfrancis9187@gmail.com',
   //                pass: 'ipejtgjjarpugifu'
   //                // pass: '0558119187A' // naturally, replace both with your real credentials or an application-specific password
   //             }
   //             });

   //          // Now we create an email template but first, we have to allow nodemail to compile the handlebars. 
   //          //For this, we have a middleware transport.use()
   //             const handlebarOptions = {
   //                viewEngine: {
   //                   extName: '.hbs',
   //                    partialsDir: path.resolve('./views/'),
   //                    defaultLayout: false,
   //                },
   //                viewPath: path.resolve('./views/'),
   //                extName: '.hbs',
   //            };

   //            // use a template file with nodemailer
   //             transporter.use('compile', hbs(handlebarOptions))

   //             const mailOptions = {
   //             from: 'andohfrancis9187@gmail.com',
   //             to: `${email}`,
   //             subject: 'Thank you for joining us',
   //            template: 'email', // the name of the template file i.e email.handlebars
   //             context:{
   //                name: `${firstName}  ${middleName} ${lastName}`, // replace {{name}} with Adebola

   //             }
   //             };

   //             transporter.sendMail(mailOptions, function(error, info){
   //             if (error) {
   //                console.log(error);
   //             } else {
   //                console.log('Email sent: ' + info.response);
   //             }
   //             });
                  
                   } }
              );
             }



      }).catch(err => {
          console.log(err)
      })

     }
   
     
);


module.exports = router;
