// 这个文件的内容是对sequelize数据库进行操作的
const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: '../database/database.sqlite'
});

//  test 在命令终端的对应目录下运行node note.js就能检测是否能产生一个问价
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


// 以上内容是为了创建一个表结构，这个表结构的内容就是text的内容
// 默认还会传入id，创建时间和更新时间
const Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING,
    }
});

// 以下内容是为了创建一个表，如果这个表在创建之前没有的话就创建一个新的
// 如果已经有的话就不会改变这个表，创建表格中的内容，再查找表格中的内容
// 如果表最开始是不存在的，那么就需要先创建一个表
// Note.sync().then(() => {
//     Note.create({text: 'hello world'}).then(()=>{
//         Note.findAll({raw:true}).then((notes)=>{
//             console.log(notes)
//         })
//     })
// });

// 以下是为了找到对应id为1的字段，主要的是通过where来进行的
// Note.findAll({raw:true,where:{id:1}}).then((notes)=>{
//     console.log(notes)
// })