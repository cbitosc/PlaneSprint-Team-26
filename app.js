const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser')

const {findOne , validatePassword} = require("./databaseOps/userOperations")

// Connection URL and database name
const url = 'mongodb://127.0.0.1:27017/nesty';

const store = new MongoDBStore({
  uri: url,
  collection: 'sessions',
});

// Connect to the MongoDB server
mongoose.connect(url)
.then(() => {
  console.log('Connected successfully to the database');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});

// Initialize the Express app
const app = express();
// key
let key = Math.floor(Math.random() * 10000).toString()
// Configure session middleware
store.on('error', function (error) {
  console.log('Session store error:', error);
});

app.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// Configure Passport strategy
const User = require('./models/userModel');
const Property = require('./models/propertyModel');
const Reservation = require('./models/reservationModel');

const strategy = new LocalStrategy(
  async function(username, password, done) {
    const [user] = await findOne(username)
    console.log(user);
    if (!user) { return done(null, false); }
    if (!validatePassword(user, password)) { return done(null, false); }
    
    return done(null, user);
  }
)
passport.use(strategy);

// Serialize/deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).exec()
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

// Other app configurations and setup
// ...

app.use(express.static('public'))

// Export the app
module.exports = app;
