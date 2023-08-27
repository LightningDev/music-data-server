const { Sequelize } = require('sequelize');

const database = process.env.DATABASE || 'postgres';
const username = process.env.USERNAME || 'nhattran';
const password = process.env.PASSWORD || '';

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;