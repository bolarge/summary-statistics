//Setup server
require('express-async-errors')

const express = require('express')
const app = express()
const mainRouter = require('./routes/datasets')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//Middleware
app.use(express.json())

const students = ["Elie", "Matt", "Joel", "Michael"];

app.get('/', (req, res) => {
  res.json({students})
})

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to Summary Statistics!");
// });

//Route
app.use('/api/v1/datasets', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
