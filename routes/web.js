const express = require('express')
const CourseController = require('../controllers/CourseController')
const { course_insert } = require('../controllers/CourseController')
const FrontController = require("../controllers/FrontController")
const router = express.Router()

//front controller
router.get("/",FrontController.login)
router.get("/registration",FrontController.registration)
router.post('/insert',FrontController.insert)
router.get('/dashboard',FrontController.dashboard)

// router.get("/login",FrontController.login)
//course controller

router.post('/course_insert',CourseController.course_insert);
router.get('/course_display',CourseController.Course_display);
router.get('/course_view/:id',CourseController.course_view)
router.get('/course_edit/:id',CourseController.course_edit)
router.post('/course_update/:id',CourseController.course_update)
router.get('/course_delete/:id',CourseController.course_delete)



module.exports=router