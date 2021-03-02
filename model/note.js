const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database/database.sqlite'
});

/*
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
*/

const Note = sequelize.define('Note', {
    // 在这里定义模型属性
    text: {
        type: DataTypes.STRING,
    }
});
/*
// 基本用法
(async () => {
    // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    await Note.sync();
    await Note.create({ text: "hello world" });
    // findAll中加入参数{ raw: true }表示查询原始存入数据
    const note = await Note.findAll({ raw: true });
    console.log(note)
})();
*/

module.exports.Note = Note;