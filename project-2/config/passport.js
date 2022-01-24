const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK
        },
    function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        //profile: what google is returning to us
        User.findOne({ googleId: profile.id }, function(err, user) {
            //cd is a build in function in passport
            if (err) return cb(err)
            if (user) {
                //the first argument is error, here is no error
                return cb(null, user)
            } else { //we have a new user
                let newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                })
                newUser.save(function(err) {
                    if (err) return cb(err)
                    return cb(null, newUser)
                })
            }

        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
