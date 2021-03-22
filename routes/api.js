var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  console.log('/notes')
  Note.findAll({raw: true}).then(function (notes) {
      console.log(notes)
      res.send({status: 0, data: notes})
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常'});
  });
});
router.post('/notes/add',function (req, res, next) {
    var note = req.body.note 
  console.log(note)
})
router.post('/notes/edit',function (req, res, next) {
    
})
router.post('/notes/delete',function (req, res, next) {
    
})

module.exports = router;
