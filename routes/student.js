const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get("/", studentController.getListStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);
router.delete("/:id", studentController.deleteStudent);
router.put("/:id", studentController.updateStudent);

module.exports = router;