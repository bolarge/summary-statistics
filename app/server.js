require('dotenv').config()
const app = require('./app')
const connectDB = require('./db/connect')

//Port
const port = process.env.PORT || '3000'

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