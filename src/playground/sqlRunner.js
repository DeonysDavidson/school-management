const Student = require("../models/studentsModel");

const deo = {
  firstName: "Deo",
  lastName: "Dave",
  age: 15,
  gender: "male"
};

Student.sync()
  .then(() => {
    Student.create(deo)
      .then(result => {
        console.log(result.get());
      })
      .catch(e => {
        console.error(e);
      });
  })
  .catch(e => {
    console.error(e);
  });
