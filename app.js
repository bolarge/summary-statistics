//Setup server
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./routes/datasets')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')


app.get('/hello', (req, res) => 
res.send('Summary Statistics App'))

//Middleware
app.use(express.json())

//Route
app.use('/api/v1/datasets', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//Port
const port = process.env.PORT || '5000'

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server started SS App on port ${port}...`)
    })
  } catch(error) {
    console.log(error)
  }
}

start()
