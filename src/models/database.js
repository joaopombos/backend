/*const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "basededados_mqvg",
  username: "basededados_mqvg_user",
  password: "1qkb2SBgZDFSwZnR5dI0fRkNKbuvWn5s",
  host: "dpg-cqbstdogph6c73c70jb0-a",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;*/



var Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'basededados_mqvg',
  'basededados_mqvg_user',
  '1qkb2SBgZDFSwZnR5dI0fRkNKbuvWn5s',
  {
    host: 'dpg-cqbstdogph6c73c70jb0-a',
    port: '5432',
    dialect: 'postgres'
  }
);

module.exports = sequelize;