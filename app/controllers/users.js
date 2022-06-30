const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error.js')
const bcrypt = require('bcryptjs')


const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res, next) => {
    // validate
    if (await User.findOne({ username: req.body.username })) {
      throw 'Username "' + req.body.username + '" is already taken';
  }
  const user = new User(req.body);

   // hash password
   if (req.body.password) {
    user.hash = bcrypt.hashSync(req.body.password, 10);
  }

  await user.save();
  res.status(201).json({ user })
})

module.exports = {
  getAllUsers,
  createUser,
}