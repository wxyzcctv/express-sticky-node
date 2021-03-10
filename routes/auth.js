var express = require('express');
var router = express.Router();

const HttpsProxyAgent = require('https-proxy-agent');

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

const gStrategy = new GitHubStrategy({
    clientID: '2bb9c2782c0b89133739',
    clientSecret: 'f9f3f726633b2d552a01ef83acdb0c4a62ed6a66',
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
)

const agent = new HttpsProxyAgent(process.env.HTTP_PROXY || "http://localhost:8080");
gStrategy._oauth2.setAgent(agent);

passport.use(gStrategy);
// 请求登录GitHub
router.get('/github', passport.authenticate('github'));
// 对GitHub返回指定内容进行处理
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        console.log('success.......')
        console.log(req.user)
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        // 登录成功后返回首页
        res.redirect('/');
    }
);
// 注销
router.get('/logout', function(req, res){
    req.session.destroy();
    // 注销成功后返回首页
    res.redirect('/');
});

module.exports = router;
