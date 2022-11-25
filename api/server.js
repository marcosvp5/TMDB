const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./db");
const morgan = require("morgan");
const { urlencoded } = require("express");
const routes = require("./routes");
const cors = require("cors");
const sessions = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
  );
app.use(cookieParser());  
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(sessions({ secret: "tmdb", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where : {email}})
        .then((user) => {
          if (!user) {
            return done(null, false); 
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); 
            }
            done(null, user); 
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use(express.json());
app.use("/", routes);
const PORT = 3001;

db.sync({ force:false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://locahost:${PORT}`);
  });
});
