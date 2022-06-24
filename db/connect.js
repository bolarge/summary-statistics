const mongoose = require('mongoose')
//const db = process.env.NODE_ENV === "test" ? process.env.MONGO_URI : process.env.MONGO_URI

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(() => console.log('connected to database'))
}

module.exports = connectDB


