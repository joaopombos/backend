const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "basededados_mqvg",
  username: "dpg-cqbstdogph6c73c70jb0-a",
  password: "1qkb2SBgZDFSwZnR5dI0fRkNKbuvWn5s",
  host: "dpg-cpup1qqj1k6c738f3fbg-a",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;
