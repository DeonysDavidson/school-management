const sequelize = require("sequelize");

const classDB = new sequelize(process.env.DB_KEY);

classDB
  .authenticate()
  .then(() => {
    console.log("The Connection was successful!");
  })
  .catch(e => {
    console.error("The Connection Failed!");
    console.error(e);
  });

module.exports = classDB;
