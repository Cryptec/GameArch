  
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const authRoute = require('./routes/auth');
const analyticRoute = require('./routes/analytic');
const gameRoute = require('./routes/games')
const settingsRoute = require('./routes/settings')
const checkAuthentication = require("./auth/is_authenticated")
const db = require('./Database');
const check_first_start = require("./database/check_first_start")
const argon2 = require("argon2")
const session = require('express-session')
const register_user = require("./database/register_user")

const crypto = require("crypto")
require('dotenv').config()

/**
 * Sets up passport (authentication)
 */
function setupPassport() {
  console.log("Setting up passport")
  passport.use(new LocalStrategy(
    async function(username, password, done) {
      db.get(`SELECT * FROM Users WHERE email = ?`,[username], async (err, user) => {
        if (password && user && username && password)
        {
          const res = await argon2.verify(user.password, password + process.env.SALT)
          if (res)
            done(err, user)
          else 
            done(err, null)
        }
        else
          done(err, null)
      })
    }
  ));
  
  passport.serializeUser((user, done) => {
    console.log("searching user: " + JSON.stringify(user))
    done(null, user.email);
  });

  passport.deserializeUser((userRes, done) => {
    db.get(`SELECT * FROM Users WHERE email = ?`,[userRes], (err, user) => {
      console.log("Deserializing user now" + userRes)
      if (user)
        done(null, user)
      else
      {
        console.log("ERROR!")
        done(err, null);
      }
    });
  });
}


/**
 * Sets up express
 */
function setupExpress() {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors({ 
    credentials: true, 
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000' 
  }));
  app.use(express.json());
  const sessionSecret = crypto.randomBytes(16).toString('hex');
  app.use(
    session({
      secret: sessionSecret,
      saveUninitialized: true,
      resave: false,
      cookie: { secure: false }
    }),
  );


  app.use(passport.initialize());
  app.use(passport.session());  
  setupPassport()

  // Route Middlewares
  app.use('/api', authRoute);
  app.use('/api',checkAuthentication, analyticRoute);
  app.use('/api',checkAuthentication, gameRoute);
  app.use('/api',checkAuthentication, settingsRoute);

  app.use(express.static('public'));
  app.use('/uploads', express.static('uploads'));


  var HTTP_PORT = 5000
  // Start server
  app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
    configure_first_start()
  }); 
}

/**
 * Configures the system if it is the first start
 * - creating env based admin user
 */
function configure_first_start()
{
  check_first_start((is_first_start) => {
    console.log("IS FIRST START: " + is_first_start)
    const ADMINMAIL = process.env.ADMIN_EMAIL
    const ADMIN_PW = process.env.INITIAL_ADMIN_PASSWORD
    if (is_first_start)
    {
      if (ADMINMAIL && ADMIN_PW)
        register_user("admin", ADMINMAIL, ADMIN_PW)
      else
        console.log("Please configure admin user in env file accordingly to the example.")
    }
  })
}


setupExpress();