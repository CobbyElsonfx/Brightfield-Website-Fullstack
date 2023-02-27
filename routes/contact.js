var express = require('express');
const router = express.Router();
var Person = require('../models/forms.js')
require("dotenv").config()
const sgMail = require('@sendgrid/mail');





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
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
             console.log(process.env.SENDGRID_API_KEY)
             //after reander send email to client 
               
               //ES6
               // sgMail.send({
               //    to :{
               //       email: "andohfrancis1191@gmail.com",
               //       name: "Cobby"
               //    },
               //    from:{
               //       email: "andohfrancis9187@gmail.com",
               //       name: "Brightfield Tech Academy"
               //    },
               //    templateId: "d-9869dcbdb55a47d2acdaa13934d5f550",
               //    dynamicTemplateData :{
               //       name:"Francis Kwabena Andoh"
               //    }
               // })
               // .then(() => {
               //    console.log("email sent succcesfully")
               // }).catch((err)=> {
               //    console.log(err)

               // }) 
               sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                  to: 'andohfrancis1191@gmail.com',
                  from: 'andohfrancis9187@gmail.com',
                  templateId: 'd-9869dcbdb55a47d2acdaa13934d5f550',
                  dynamicTemplateData: {
                     subject: 'Testing Templates',
                     name: 'Francis Kwabena Andoh',
                     city: 'Ghana',
                  },
                  };
                  sgMail.send(msg).then(()=>{
                     console.log("email sent successfully")
                  }).catch((err)=>{
                        console.log(err)
                  })
                  
                     }                    }
               );
             }



      }).catch(err => {
         console.log(err)
      })

    }
   
     
);


module.exports = router;
