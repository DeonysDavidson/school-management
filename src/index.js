const express = require("express");
const studentsRouter = require("./routers/studentsRouter");
const teachersRouter = require("./routers/teachersRouter");
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars");
const formatIndex = require("./views/helpers/formatIndex");
const ifEquality = require("./views/helpers/ifEquality");
const Student = require("./models/studentsModel");
const Teacher = require("./models/teachersModel");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    formatIndex,
    ifEquality
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "home"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "hero",
    pageTitle: "about"
  });
});

app.get("/students", async (req, res) => {
  try {
    const studentFromDB = await Student.findAll();

    const studentsArray = studentFromDB.map(ele => ele.get());

    res.render("students", {
      layout: "navigation",
      pageTitle: "students",
      name: "students",
      btn: "nan",
      students: studentsArray
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/add-students", (req, res) => {
  res.render("add-students", {
    layout: "navigation",
    pageTitle: "Add-students",
    action: "/api/students",
    method: "POST",
    name: "students",
    btn: "Add"
  });
});

app.get("/edit-student/:id", async (req, res) => {
  try {
    const requiredStudent = await Student.findByPk(parseInt(req.params.id));
    const student = requiredStudent.get();

    if (student) {
      res.render("edit-students", {
        layout: "navigation",
        pageTitle: "Edit-Student :" + student.firstName,
        action: "/api/students/" + student.id,
        method: "PATCH",
        btn: "Edit",
        stud: true,
        name: "students",
        gender: student.gender,
        student
      });
    } else {
      res.status(400).send("Student Not found!");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete-student/:id", async (req, res) => {
  try {
    const requiredStudent = await Student.findByPk(parseInt(req.params.id));
    const student = requiredStudent.get();

    if (student) {
      requiredStudent.destroy();
      res.redirect("/students");
    } else {
      res.status(404).send("invalid student");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/teachers", async (req, res) => {
  try {
    const teacherAll = await Teacher.findAll();
    const teachersArray = teacherAll.map(ele => ele.get());

    res.render("teachers", {
      layout: "navigation",
      pageTitle: "teachers",
      name: "teachers",
      btn: "nan",
      teachers: teachersArray
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/add-teachers", (req, res) => {
  res.render("add-teachers", {
    layout: "navigation",
    pageTitle: "Add-teacher",
    action: "/api/teachers",
    method: "POST",
    name: "teachers",
    btn: "Add"
  });
});

app.get("/edit-teacher/:id", async (req, res) => {
  try {
    const thatTeacher = await Teacher.findByPk(parseInt(req.params.id));
    const teacher = thatTeacher.get();
    if (teacher) {
      res.render("edit-teachers", {
        layout: "navigation",
        pageTitle: "Edit-Teacher :" + teacher.firstName,
        action: "/api/teachers/" + teacher.id,
        method: "PATCH",
        btn: "Edit",
        name: "teachers",
        gender: teacher.subject,
        stud: false,
        teacher
      });
    } else {
      res.status(400).send("Teacher Not found!");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete-teacher/:id", async (req, res) => {
  try {
    const requiredTeacher = await Teacher.findByPk(parseInt(req.params.id));
    const teacher = requiredTeacher.get();

    if (teacher) {
      requiredTeacher.destroy();
      res.redirect("/teachers");
    } else {
      res.status(404).send("invalid student");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.use("/api/students", studentsRouter);

app.use("/api/teachers", teachersRouter);

app.listen(8080, () => {
  console.log("Server Running");
});
