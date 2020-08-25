const express = require("express");
const teachers = require("../models/teachers");
const Teacher = require("../models/teachersModel");

const teachersRouter = express.Router();

teachersRouter
  .get("/", (req, res) => {
    res.status(200).json({
      teachers
    });
  })

  .get("/:id", (req, res) => {
    try {
      const teacher = teachers.find(teacher => {
        return teacher.id === parseInt(req.params.id);
      });

      if (teacher) {
        res.status(200).json({
          teacher
        });
      } else {
        res.status(400).send("Teacher Not found!");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/", async (req, res) => {
    if (req.body.firstName) {
      const newTeacher = {
        ...req.body
      };
      const createdTeacher = await Teacher.create(newTeacher);
      res.status(200).json({
        teacher: createdTeacher
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })

  .patch("/:id", async (req, res) => {
    try {
      const requiredTeacher = await Teacher.findByPk(parseInt(req.params.id));
      let teacher = requiredTeacher.get();

      teacher = {
        ...teacher,
        ...req.body
      };
      const updateResult = await requiredTeacher.update(teacher);
      res.status(200).json({ teacher: updateResult.get() });
    } catch (e) {
      res.status(500).send("Server Error");
    }
  })

  .delete("/:id", (req, res) => {
    try {
      let teacherIndex;
      for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].id === parseInt(req.params.id)) {
          teacherIndex = i;
        }
      }
      if (teacherIndex) {
        teachers.splice(teacherIndex, 1);
        res.status(202).json({});
      } else {
        res.status(404).send("invalid Teacher");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = teachersRouter;
