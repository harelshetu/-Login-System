if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express');
const path = require('path');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const PORT = 5000;
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error('Failed to connect the Database',error));
db.once('open', () => console.log('Connected to Database'));

require('./config/passport')(passport);

app.use(session({
    secret:'my secret',
    resave:true,
    saveUninitialized:true
  }));
app.use(passport.initialize());
app.use(passport.session());
  app.use(require('connect-flash')());
  
  //  Messages Middleware
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

app.use(express.urlencoded({ extended: false }));

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));


app.use('/',require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(PORT, ()=> console.log(`server starts at port ${PORT}`));