const { Sequelize } = require('sequelize');

const database = process.env.DATABASE || 'database';
const username = process.env.USERNAME || 'username';
const password = process.env.PASSWORD || 'password';

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;