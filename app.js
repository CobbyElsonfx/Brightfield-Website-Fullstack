const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnect = require("./db/connect")
const bodyParser = require('body-parser');
const multer = require('multer');
const port = process.env.PORT || 8585;
const dotenv = require("dotenv");
dotenv.config();


//in built middlewares
const hbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
//custom middlewares
const {requireAuth ,checkUser } = require("./middleware/requireAuth")

//importing  routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/mentorship')
const contactRouter = require('./routes/contact')
const learnRouter = require('./routes/learn')
const programsRouter = require('./routes/programs')
const mentorshipRouter = require('./routes/mentorship')
const newsfeed = require('./routes/newsfeed')
const loginRouter = require("./routes/authLogin")
const signupRouter = require("./routes/authSignup")
const logout = require("./routes/authLogout")
const app = express();


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

// app.get("*",checkUser)
app.use('/',checkUser, indexRouter);
app.use('/users',checkUser ,usersRouter);
app.use('/about',checkUser,aboutRouter)
app.use('/contact',checkUser,requireAuth, contactRouter)
app.use('/learn',checkUser,learnRouter)
app.use('/programs',checkUser,programsRouter)
app.use('/mentorship',checkUser, mentorshipRouter)
app.use('/newsfeed', checkUser,requireAuth ,  newsfeed)
app.use('/user/signup',signupRouter)
app.use('/user/login',loginRouter )
app.use("/user/logout", logout)




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

