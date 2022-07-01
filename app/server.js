require('dotenv').config()
const app = require('./app')
const connectDB = require('./db/connect')

//Port
//const port = process.env.NODE_ENV === "dev" ? process.env.PORT : process.env.NODE_DOCKER_PORT
const port = process.env.NODE_DOCKER_PORT || process.env.PORT

const start = async () => {
  try{
    await connectDB()
    app.listen(port, () => {
      console.log(`SS Server started on port ${port} ...`)
    })
  } catch(error) {
    console.log(error)
  }
}

start()