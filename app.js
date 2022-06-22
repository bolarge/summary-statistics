//Setup server
const express = require('express')
const app = express()
const datasets = require('./routes/datasets')
const connectDB = require('./db/connect')
require('dotenv').config()

app.get('/hello', (req, res) => 
res.send('Summary Statistics App'))

//Middleware
app.use(express.json())

//Route
app.get('/hello', (req, res) => {
  res.send('Summary Statistics App')
})

app.use('/api/v1/datasets', datasets)

//Port
const port = '5000'

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
