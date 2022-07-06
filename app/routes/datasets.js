const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { login,  logout} = require('../controllers/auth')
const { getAllUsers, createUser } = require('../controllers/users')

const {
  getAllDataSets,
  createDataSet,
  getDataSet,
  updateDataSet,
  deleteDataSet,
  getSalariesByOnContract,
  getSalariesByDepartment
} = require('../controllers/datasets')

//IDENTITY AND SECURITY
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/users').post(createUser)

//USER 
router.route('/users').get(authenticateUser, authorizePermissions('admin'), getAllUsers)

//DATASET
router.route('/department').get(authenticateUser, getSalariesByDepartment)
router.route('/contract').get(authenticateUser, getSalariesByOnContract)
router.route('/:id').get(authenticateUser, getDataSet).patch(authenticateUser, updateDataSet).delete(authenticateUser, deleteDataSet)
router.route('/').get(authenticateUser, getAllDataSets).post(authenticateUser, createDataSet)

module.exports = router