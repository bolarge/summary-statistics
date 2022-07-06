//Setup server
require('express-async-errors')
const express = require('express')
const app = express()
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const mainRouter = require('./routes/datasets')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//Middleware
app.use(express.json())
app.use(helmet())
app.use(cookieParser(process.env.JWT_SECRET))

//Route
app.use('/api/v1/datasets', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
