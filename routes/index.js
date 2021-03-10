var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {
        title:'我的便利贴'
    };
    if(req.session.user){
        data = Object.assign(data,{
            isLogin: true,
            user: req.session.user,
        })
    }else{
        data = Object.assign(data,{
            isLogin: false,
        })
    }
    res.render('index', data);
});

module.exports = router;
