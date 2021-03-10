var express = require('express');
var router = express.Router();
var Note = require('../models/note').Note

/* 获取所有的 notes */

router.get('/notes', function (req, res, next) {
  var query = { raw: true }
  // 判断用户是否登录，如果未登录就展示所有的数据内容，如果已经登录了就展示用户自己的数据内容
  if (req.session.user) {
    query.where = {
      uid: req.session.user.id
    }
  }
  Note.findAll(query).then((notes) => {
    res.send({ status: 0, data: notes })
  }).catch(() => {
    res.send({ status: 1, errorMsg: '数据库出错了' })
  })
});

/*新增note*/
router.post('/notes/add', function (req, res, next) {
  // 通过session的方式判断是否登录，如果没有登录就提示登录
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }

  var note = req.body.note;
  var uid = req.session.user.id

  Note.create({ text: note, uid: uid }).then(() => {
    res.send({ status: 0 })
  }).catch(() => {
    res.send({ status: 1, errorMsg: '数据库出错了' })
  })
})

/*修改note*/
router.post('/notes/edit', function (req, res, next) {
  // 通过session的方式判断是否登录，如果没有登录就提示登录
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }

  var uid = req.session.user.id

  Note.update({ text: req.body.note }, { where: { id: req.body.id, uid: uid } }).then(() => {
    res.send({ status: 0 })
  }).catch(() => {
    res.send({ status: 1, errorMsg: '数据库出错了' })
  })
})

/*删除note*/
router.post('/notes/delete', function (req, res, next) {
  // 通过session的方式判断是否登录，如果没有登录就提示登录
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }

  var uid = req.session.user.id

  Note.destroy({ where: { id: req.body.id, uid: uid } }).then(() => {
    res.send({ status: 0 })
  }).catch(() => {
    res.send({ status: 1, errorMsg: '数据库出错了' })
  })
})

module.exports = router;
