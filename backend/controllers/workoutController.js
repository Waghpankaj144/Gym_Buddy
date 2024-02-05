/*
Controllers:-
A controller is a part of a web application that receives requests from the user and returns a response.
The controller is responsible for interacting with the model (the data layer) and the view (the presentation layer).
*/
const Workout = require('../models/workoutModel.js')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({ createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'No such workout found'})

    const workout = await Workout.findById(id)

    //return is used to ensure rest of the code within the function isn't executed
    if(!workout)
        return res.status(404).json({error: 'No such workout found'})

    res.status(200).json(workout)
}

//create a workout
const createWorkout = async (req,res)=>{
    const { title, reps, load } = req.body
    //add a doc to DB
    try {
       const workout = await Workout.create({title, reps, load})
       res.status(200).json(workout) 
    } catch (err) {
        res.status(400).json({err : err.message})
    }
}

//delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'No such workout found'})
    
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout)
        return res.status(404).json({error: 'No such workout found'})

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'No such workout found'})
    
    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body})

    if(!workout)
        return res.status(404).json({error: 'No such workout found'})

    res.status(200).json(workout)
}

module.exports = {createWorkout,getWorkouts,getWorkout, deleteWorkout,updateWorkout}