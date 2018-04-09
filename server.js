// We saw how we could download dependencies via npm. To use those dependencies in our code we require them. The syntax to require a library is the keyword require and a string for the name of the library. We assign this require function to a variable and can then access methods from the library through that variable. Here we are requiring all of our dependencies at the top of the page as is good practice.
const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const mongoose = require('mongoose')

// mongoose and mongodb
// start a mongodb collection called studdent
// 27017 is mongodb default port
mongoose.connect('mongodb://'+process.env.IP+':'+'27017'+'/studentsdb')

// We are using the dotenv library to load our environmental variables from the .env file. We don't have anything in the .env file for now, but we will soon.
dotenv.load();


// This line of code instantiates the Express JS framework. We assign it to a variable called app, and will add our configruation to this variable.
const app = express();
const server = http.createServer(app);


// The .set method allows us to configure various options with the Express framework. Here we are setting our views directory as well as telling Express that our templating engine will be Jade. More on that soon.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure Passport to use Auth0. Fill in your Auth0 credentials here.
const strategy = new Auth0Strategy(
  {
    domain: 'Auth0_Domain',
    clientID: 'Auth0_Client_ID',
    clientSecret: 'Auth0_Client_Secret',
    callbackURL: '/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// The .use method is similar to the .set method, where it allows us to set further configurations. The .use method also acts as a chain of events that will take place once a request hits our Node.js application. First we'll log the request data, parse any incoming data, and so on.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  // change session secret here
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Just like external libraries, we can import our application code using the require function. The major difference is that we have to give the exact path to our file. We saw in the directory structure section that we will have an index.js file in a routes directory. Go ahead and create it if you haven't already, otherwise you'll get errors when compiling the code.
// must be after we declare for body_parser
const routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// If our applicatione encounters an error, we'll display the error and stacktrace accordingly.
// comment this block out if you want stacktrace to show in browser and terminal
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: err
  });
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("node starter kit server listening at", addr.address + ":" + addr.port);
});