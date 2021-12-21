const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");

const User = require("../models/user");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "615458299438-hvvumni00ctj47ltkvimjg3o068un7fe.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy passport");
          return;
        }

        console.log(profile);
        //   if found then set this user as req.user
        if (user) {
          return done(null, user);
        } else {
          //  if not then create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user");
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
