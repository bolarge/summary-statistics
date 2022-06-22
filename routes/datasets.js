const express = require('express')

const router = express.Router();

const {
  getAllDataSets,
  createDataSet,
  getDataSet,
  updateDataSet,
  deleteDataSet,
  getSalariesByOnContract,
  getSalariesByDepartment
} = require('../controllers/datasets');

const { signInUser, getAllUsers, createUser } = require('../controllers/users');
const {login, dashboard } = require('../controllers/main')
const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/login').post(login)
//
router.route('/department').get(getSalariesByDepartment)
router.route('/contract').get(getSalariesByOnContract)
router.route('/users').get(getAllUsers).post(createUser)
router.route('/:id').get(getDataSet).patch(updateDataSet).delete(deleteDataSet)
router.route('/').get(getAllDataSets).post(createDataSet)



module.exports = router