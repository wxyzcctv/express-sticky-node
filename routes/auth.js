var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: '92b79fa750802513d41a',
    clientSecret: 'eb8864fe214d98f848df47b64d5865ef0516cbb3',
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

router.get('/github',
  passport.authenticate('github'));
 
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
    };
    res.redirect('/');
  });
  router.get('/logout',function (req,res) {
      req.session.destroy()
      res.redirect('/')
  })

module.exports = router