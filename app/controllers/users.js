const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes');
const Validator  = require('../validation/validator')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const getAllUsers = asyncWrapper(async (req, res) => {
  console.log(req.user)
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
})

const createUser = asyncWrapper(async (req, res) => {
  let newUser = req.body
  // validate
   newUser = Validator.validatePayload(newUser, Validator.UserValidation)

  const emailAlreadyExists = await User.findOne({ email: req.body.email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  newUser.role = role

  const user = await User.create(newUser)
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  //console.log(tokenUser)
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
})

module.exports = {
  getAllUsers,
  createUser,
}