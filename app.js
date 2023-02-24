var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbConnect = require("./db/connect")
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer()
const port = 8585;

require("dotenv").config()

//
const hbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
//importing various routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/mentorship')
var contactRouter = require('./routes/contact')
var learnRouter = require('./routes/learn')
var hireRouter = require('./routes/hire')
var mentorshipRouter = require('./routes/mentorship')
var newsfeed = require('./routes/newsfeed')
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine(
  "hbs",
  hbs.engine({
    helpers: multihelpers,
    partialsDir: ["views/partials"],
    extname: ".hbs",
    layoutsDir: "views",
    defaultLayout: "layout"
  })
)
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about',aboutRouter)
app.use('/contact', contactRouter)
app.use('/learn',learnRouter)
app.use('/hire',hireRouter)
app.use('/mentorship', mentorshipRouter)
app.use('/newsfeed', newsfeed)




const start = async ()=>{            //in order to get the database connect before starting the servers 
  // se decedided to use async await function 
  try { 
      await dbConnect(process.env.MONGO_URI)
       app.listen(port , ()=>{
       console.log(`listening at port ${port} `)
         }) 
  } catch (error) {
      console.log(error)
  }
} 


start()

// if (dbConnect(process.env.MONGO_URI)){
//   console.log("connected success")
// }else{
//   console.log("conection failed")
// }



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app; it expors to the bin/www folder for server startup but i wan to start the server in the app.js 
