var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var JirenguStrategy = require('passport-girengu').Strategy;
// 这里使用的第三方登录的情况，那我可以使用微信，QQ进行登录了

passport.serializeUser((user,done)=>{
    console.log('---serializeUser---')
    console.log(user)
    done(null,user)
});
passport.deserializeUser((user,done)=>{
    console.log('---deserializeUser')
    done(null,obj);
})
passport.use(new JirenguStrategy)({
    clientID: '',
    tokenURL: '',
    clientSerect:'',
    callbackURL:'',
    function (accessToken,refreshToken,profile,done) {
        done(null,profile)
    }
})

router.get('/jirengu',
    passport.authenticate('jirengu'));

module.exports = router;