const express = require("express");
const students = require("../models/students");
const Student = require("../models/studentsModel");

const studentsRouter = express.Router();

studentsRouter
  .get("/", (req, res) => {
    res.status(200).json({
      students
    });
  })

  .get("/:id", (req, res) => {
    try {
      const student = students.find(student => {
        return student.id === parseInt(req.params.id);
      });

      if (student) {
        res.status(200).json({
          student
        });
      } else {
        res.status(400).send("Student Not found!");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/", async (req, res) => {
    if (req.body.firstName && req.body.age < 18) {
      const newStudent = {
        teacherId: 1,
        ...req.body
      };
      const createdStudent = await Student.create(newStudent);

      res.status(200).json({
        student: createdStudent
      });
    } else {
      res.status(400).send("Invalid Student");
    }
  })

  .patch("/:id", async (req, res) => {
    try {
      const requiredStudent = await Student.findByPk(parseInt(req.params.id));
      let student = requiredStudent.get();

      student = {
        ...student,
        ...req.body
      };
      const updateResult = await requiredStudent.update(student);
      res.status(200).json({ student: updateResult.get() });
    } catch (e) {
      res.status(500).send("Server Error");
    }
  })

  .delete("/:id", (req, res) => {
    try {
      let studentIndex;
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === parseInt(req.params.id)) {
          studentIndex = i;
        }
      }
      if (studentIndex) {
        students.splice(studentIndex, 1);
        res.status(202).json({});
      } else {
        res.status(404).send("invalid student");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = studentsRouter;
