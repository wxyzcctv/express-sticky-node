var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  var data  = Note.getAll()
  Note.findAll({raw:true}).then(()=>{
    res.send({status: 0, data: data})
  })
});
router.post('/notes/add',function(req, res, next){
  var note = req.body.note
  console.log('add..', note)
});
router.post('/notes/edit',function(req, res, next){

});
router.post('/notes/delete',function(req, res, next){

})

module.exports = router;
