const express = require('express')
const app = express()
const request = require("supertest")

const mainRouter = require('../routes/users')

const connectDB = require('../db/connect')
const Dataset = require('../models/User')

const port = process.env.PORT
const start = async () => {
  try{
    await connectDB()
    app.listen(port, () => {
      console.log(`Server started SS App on port ${port}...`)
    })
  } catch(error) {
    console.log(error)
  }
}

start()

//Middleware
app.use(express.json())

//Route
app.use('/api/v1/datasets', mainRouter)