//Setup server
require('express-async-errors')
const express = require('express')
const app = express()
const mainRouter = require('./routes/datasets')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//Middleware
app.use(express.json())

//Route
app.get('/hello', (req, res) => {
  res.send('Summary Statistics App!')
})

app.use('/api/v1/datasets', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
