require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts.js')
const path = require('path')

const app = express()

//middleware - code that executes between req and res
/* next() - Middleware can call the next function to pass control to the next middleware in the chain or to 
the next route handler. This allows multiple middleware functions to sequentially process the request and response */
app.use((req,res,next)=>{   //global middleware
    console.log(req.path,req.method)
    next()
})

app.use(cors())

//routes
app.use(express.json()) // allows us to access the info in the body of the req

app.use('/api/workouts' ,workoutRoutes)
//static file
app.use(express.static(path.join(__dirname,'./Gym_Buddy/frontend/build')))
app.get('*', funtion(req, res){[
    res.sendFile(path.join(__dirname,'./Gym_Buddy/frontend/build/index.html'))
]})

//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/crud")
.then(()=>{
    //listen for requests
    if(process.env.PORT)
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to DB & Server's Working on port "+process.env.PORT)
        })
}).catch((err)=>{
    console.log(err)
})

module.exports = app