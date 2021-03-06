"use strict";
const path = require("path");
const chalk = require("chalk");
const Sequelize = require("sequelize");
const DATABASE_URI = require(path.join(__dirname, "../env")).DATABASE_URI;

console.log(chalk.yellow("Opening connection to PostgreSQL"));

module.exports = new Sequelize(DATABASE_URI, {
  logging: false, // set to console.log to see the raw SQL queries
});
