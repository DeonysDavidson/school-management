const Student = require("../models/studentsModel");
const Teacher = require("../models/teachersModel");

const teacherData = [
  {
    firstName: "Santhosh",
    lastName: "Rajan",
    email: "test1@gmail.com",
    class: "10th",
    subject: "physics"
  },
  {
    firstName: "John",
    lastName: "Peter",
    email: "test2@gmail.com",
    class: "9th",
    subject: "maths"
  },
  {
    firstName: "Arul",
    lastName: "Rajan",
    email: "test3@gmail.com",
    class: "8th",
    subject: "english"
  },
  {
    firstName: "Jason",
    lastName: "Samuel",
    email: "test4@gmail.com",
    class: "11th",
    subject: "physics"
  },
  {
    firstName: "Lacto",
    lastName: "Vargese",
    email: "test5@gmail.com",
    class: "12th",
    subject: "maths"
  }
];

const DBSeeder = () => {
  Teacher.sync({ force: true })
    .then(() => {
      teacherData.forEach(teacher => {
        Teacher.create(teacher)
          .then(teacherRes => {
            console.log(teacherRes.get());
          })
          .catch(e => {
            console.error(e);
          });
      });
    })
    .catch(e => {
      console.error(e);
    });
};

DBSeeder();

module.exports = DBSeeder;
