import express from 'express'
import CourseModel from '../models/CourseModel.js'
// import StudentModel from '../models/StudentModel.js'

const router = express.Router()
// router.get('/test', (req, res) => {
//     try {
//         res.send({
//             message: "API running",
//             success: true
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message: "Internal Server Error",
//             success: false
//         })
//     }
// })
// // Enroll in course
// router.post('/enroll', async (req, res) => {
//     try {
//         const { courseId, studentId } = req.query
//         const course = await CourseModel.findById(courseId)
//         if (!course) {
//             return res.status(404).send({
//                 message: 'Course not found',
//                 success: false
//             })
//         }
//         const student = await StudentModel.findOne({ user_id: studentId })
//         if (!student) {
//             return res.status(404).send({
//                 message: 'Student not found',
//                 success: false
//             })
//         }
//         await student.enrolledIn.push(courseId)
//         await course.enrolledBy.push(studentId)
//         await student.save()
//         await course.save()
//         return res.status(200).send({
//             message: 'Enrolled succesfully',
//             success: true
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message: 'Internal Server Error',
//             success: false
//         })
//     }
// })

// // Get enrolled courses
// router.get('/enrolledCourses/:studentId', async (req, res) => {
//     try {
//         const { studentId } = req.params
//         const student = await StudentModel.findOne({user_id:studentId}).populate('enrolledIn')
//         const enrolledCourses = student.enrolledIn
        
//         return res.status(201).send({
//             message: 'Enrolled courses fetched succesfully',
//             data: enrolledCourses,
//             success: true
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message: 'Internal Server Error',
//             success: false
//         })
//     }
// })

export default router