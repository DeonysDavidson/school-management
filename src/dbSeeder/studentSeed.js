const Student = require("../models/studentsModel");
const Teacher = require("../models/teachersModel");

const studentData = [
  {
    firstName: "Arun",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Ram",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Magesh",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Suresh",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  }
];

const teacher = {
  firstName: "Deo",
  lastName: "Dave",
  email: "test@gmail.com",
  subject: "english"
};

const DBSeeder = () => {
  let id;
  Teacher.sync({ force: true })
    .then(() => {
      return Teacher.create(teacher);
    })
    .then(teacherResult => {
      ({ id } = teacherResult.get());
      return Student.sync({ force: true });
    })
    .then(() => {
      studentData.forEach(student => {
        Student.create({
          ...student,
          teacherId: id
        })
          .then(result => {
            console.log(result.get());
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
