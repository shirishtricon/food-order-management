const { Sequelize,DataTypes } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
    pool: { max:5, min: 0, idle: 10000}
});

sequelize.authenticate()
.then(() => {
    console.log('DB connected successfully');
})
.catch((err) => {
    console.log('Error', err);
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.categories = require('./categories')(sequelize, DataTypes);
db.items = require('./items')(sequelize, DataTypes);

// db.categories.hasMany(db.employees);
// db.employees.belongsTo(db.categories)

db.sequelize.sync({alter: true})
.then(() => {
    console.log('yes re-sync');
})
.catch((err) => {
    console.log(err);
})

module.exports = db;