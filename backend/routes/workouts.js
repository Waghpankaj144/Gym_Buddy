const express = require('express')
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout
} = require('../controllers/workoutController.js')

const router = express.Router()

//path specified is relative to the orginal route wrt which the use method's called

//get all workouts
router.get('/',getWorkouts) 

//get a single workout
router.get('/:id',getWorkout)

//create a workout
router.post('/',createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)

module.exports = router