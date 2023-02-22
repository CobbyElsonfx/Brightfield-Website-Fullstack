var express = require('express');
var Person = require('../models/forms.js')
const router = express.Router();




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
            }
         
                                              }
               );
             }z

      }).catch(err => {
         console.log(err)
      })




                 }
   
     
);


module.exports = router;
