var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note;

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  Note.findAll({raw:true}).then((notes)=>{
    res.send({status: 0, data: notes})
  })
});
router.post('/notes/add',function(req, res, next){
  var note = req.body.note
  Note.create({text:note}).then(()=>{
    res.send({status:0})
  }).catch(()=>{
    res.send({status: 1, errorMsg: '添加出错'})
  })
  console.log('add..', note)
});
router.post('/notes/edit',function(req, res, next){
  Note.update({text: req.body.note}, {where: {id: req.body.id}} ).then(()=>{
    console.log(arguments)
    res.send({status: 0})
  }).catch(()=>{
      res.send({status: 1, errorMsg: '更新失败'})
    }
  )
});
router.post('/notes/delete',function(req, res, next){
  Note.destroy({where:{id:req.body.id}}).then(()=>{
    res.send({status: 0})
    console.log('false')
  }).catch(()=>{
      res.send({status: 1, errorMsg: '删除出错'})
    }
  )
})

module.exports = router;
