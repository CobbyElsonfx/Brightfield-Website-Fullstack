var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbConnect = require("./db/connect")
var bodyParser = require('body-parser');
var multer = require('multer');
const port = process.env.PORT || 8585;
const dotenv = require("dotenv");
dotenv.config();


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
var programsRouter = require('./routes/programs')
var mentorshipRouter = require('./routes/mentorship')
var newsfeed = require('./routes/newsfeed')
var loginRouter = require("./routes/authLogin")
var signupRouter = require("./routes/authSignup")
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
app.use('/programs',programsRouter)
app.use('/mentorship', mentorshipRouter)
app.use('/newsfeed', newsfeed)
app.use('/signup', signupRouter)
app.use('/login',loginRouter )




const start = async ()=>{            //in order to get the database connect before starting the servers 
  // se decided to use async await function 
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

