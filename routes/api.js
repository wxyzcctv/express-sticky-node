var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/* GET users listing. */
// 查找数据库中所有notes，访问数据库的函数为findAll，传入参数{ raw: true }能获得精简数据内容。
// 成功获取之后将得到的内容通过res.send的方式传给前端进行展示。
router.get('/notes', function (req, res, next) {
  var opts = { raw: true }
  if (req.session.user) {
    opts.where = {
      uid: req.session.user.id
    }
  }
  Note.findAll(opts).then(function (notes) {
    res.send({ status: 0, data: notes })
  }).catch(function () {
    res.send({ status: 1, errorMsg: '数据库异常' });
  });
});
// 增加一条note，在数据库中新增一条数据的方法是Note.create，函数的参数就是传入的内容
router.post('/notes/add', function (req, res, next) {
  if (!req.session.user) {
    res.send({ status: 1, errorMsg: '请先登录' })
  }
  var uid = req.session.user.id
  Note.create({ text: req.body.note, uid: uid }).then(function () {
    res.send({ status: 0 })
  }).catch(function () {
    res.send({ status: 1, errorMsg: '数据库异常' })
  })
})
// 编辑一条note，在数据库中编辑一条数据的方法是Note.update，函数的参数就是传入的内容，通过where方式选择需要修改的那条数据
router.post('/notes/edit', function (req, res, next) {
  if (!req.session.user) {
    res.send({ status: 1, errorMsg: '请先登录' })
  }
  var uid = req.session.user.id
  Note.update({ text: req.body.note }, { where: { id: req.body.id, uid: uid } }).then(function () {
    res.send({ status: 0 })
  }).catch(function () {
    res.send({ status: 1, errorMsg: '数据库异常' })
  })
})
// 删除一条note，在数据库中删除一条数据的方法是Note.destroy，过传入对象中通过where获取需要删除的那条数据
router.post('/notes/delete', function (req, res, next) {
  if (!req.session.user) {
    res.send({ status: 1, errorMsg: '请先登录' })
  }
  var uid = req.session.user.id
  Note.destroy({ where: { id: req.body.id, uid: uid } }).then(function () {
    res.send({ status: 0 })
  }).catch(function () {
    res.send({ status: 1, errorMsg: '数据库异常' })
  })
})

module.exports = router;
