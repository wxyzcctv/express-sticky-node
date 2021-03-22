var { Sequelize } = require('sequelize');
var path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

var Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    }
});

(async () => {
    Note.sync()
})();


/*
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
*/

// (async () => {
//     // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
//     Note.sync().then(function () {
//         Note.create(
//             { text: 'haha' }
//         )
//     })
//     Note.findAll({raw: true}).then(function(articles) {
//         console.log(articles)
//     })
// })();

module.exports = Note;