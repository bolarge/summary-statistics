const express = require('express')
const router = express.Router()

const {
  getAllDataSets,
  createDataSet,
  getDataSet,
  updateDataSet,
  deleteDataSet,
  getSalariesByOnContract,
  getSalariesByDepartment
} = require('../controllers/datasets');

// const { getAllUsers, createUser } = require('../controllers/users');
// const {login, dashboard } = require('../controllers/main')
// const authMiddleware = require('../middleware/auth')

router.route('/').get(getAllDataSets).post(createDataSet)

// router.route('/login').post(login)
// router.route('/dashboard').get(authMiddleware, dashboard)
// //
// router.route('/department').get(authMiddleware, getSalariesByDepartment)
// router.route('/contract').get(authMiddleware, getSalariesByOnContract)
// router.route('/users').get(authMiddleware, getAllUsers).post(authMiddleware, createUser)
// router.route('/:id').get(authMiddleware, getDataSet).patch(authMiddleware, updateDataSet).delete(authMiddleware, deleteDataSet)
// router.route('/').get(authMiddleware, getAllDataSets).post(authMiddleware, createDataSet)



module.exports = router