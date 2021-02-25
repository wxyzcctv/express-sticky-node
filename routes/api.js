var express = require('express');
var router = express.Router();
// var Note = require('../models/note')

/* 获取所有的 notes */

router.get('/notes', function(req, res, next) {
  console.log("/notes")
  var data = req.body.note
  console.log(data)
});

/*新增note*/
router.post('/notes/add', function(req, res, next){
  var data = req.body.note
  console.log(data)
})

/*修改note*/
router.post('/notes/edit', function(req, res, next){
  
})

/*删除note*/
router.post('/notes/delete', function(req, res, next){
  
})

module.exports = router;
