const sequelize = require("sequelize");
const classDB = require("../config/dbConfig");
const Teacher = require("./teachersModel");

const Student = classDB.define("students", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: sequelize.STRING,
    allowNull: false,
    field: "first_Name"
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false,
    field: "last_Name"
  },
  age: {
    type: sequelize.INTEGER,
    allowNull: false,
    validator: {
      max: 17
    }
  },
  gender: {
    type: sequelize.ENUM,
    values: ["male", "female"],
    allowNull: false
  },
  teacherId: {
    type: sequelize.INTEGER,
    field: "teacher_id",
    allowNull: false,
    references: {
      model: Teacher,
      key: "id",
      deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = Student;
