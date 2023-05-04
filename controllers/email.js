var Person = require("../models/forms.js");
var path = require("path");
var sgMail = require("@sendgrid/mail");
require("dotenv").config();


// const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars')




const userForms = function(req,res) {
const {age,
       email,
       firstName,
       gender,
       lastName,
       message,
       middleName,
       phoneNumber} =  req.body;  //destructuring from the req body
  Person.findOne({email} )
  .then((user) => {
    if(user){
      res.send(`<script>
                  alert("Email already exist."); 
                  window.location.href = "/contact"; 
               </script>`
               );
    }
      else{
         const newPerson = new Person({
           age,
           email,
           firstName,
           gender,
           lastName,
           message,
           middleName,
           phoneNumber
         });
         newPerson.save(function(err, Person){
            if(err){
             res.redirect("contact", {
                                      message:"Database error",
                                      type: "error"
                                     });
           // res.send("err facing")
            }
            else{
            res.render("contactsubmission", {  age,
                                               email,
                                               firstName,
                                               gender,
                                               lastName,
                                               message,
                                               middleName,
                                               phoneNumber});
               sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                  from: "andohfrancis9187@gmail.com",
                  to: `${email}`,
                  templateId: "d-9869dcbdb55a47d2acdaa13934d5f550",
                  dynamicTemplateData: {
                     subject: "Testing Templates",
                     name: `${firstName} ${ middleName} ${lastName}`,
                     city: 'Ghana',
                  },
                  };
                  sgMail.send(msg).then(()=>{
                     console.log("email sent successfully");
                  }).catch((err)=>{
                        console.log(err);
                  })

                   } }
              );
             }



      }).catch((err) => {
          console.log(err);
      });
     };


     module.exports = {
      userForms
    };