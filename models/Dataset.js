const mongoose = require('mongoose')

//Create Schema
const DataSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  salary: {
    type: Number,
    require: [true, 'must provide salary'],
    min: [2, 'Salary is to low'],
    
  },
  currency: {
    type: String,
    require: [true, 'must provide currency'],
    length: 3,
    trim: true
  },
  department: {
    type: String,
    require: [true, 'must provide department'],
    length: 20,
    trim: true
  },
  sub_department: {
    type: String,
    require: [true, 'must provide sub department'],
    length: 20,
    trim: true
  },
  on_contract: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Dataset', DataSetSchema)