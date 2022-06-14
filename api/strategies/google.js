const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (googleId, done) => {
  try {
    const user = await User.findOne({ googleId });
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
      scope: ["openid","profile"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const findUser = await User.findOneAndUpdate(
          { googleId: profile.id },
          { new: true }
        );
        if (findUser) {
          console.log("User was found in the DB");
          return done(null, findUser);
        } else {
          const newUser = await User.create({
            googleId: profile.id,
            username: profile.name.givenName,
            avatar: profile.picture,
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);
