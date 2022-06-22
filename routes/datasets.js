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
} = require('../controllers/datasets')

router.route('/department').get(getSalariesByDepartment)
router.route('/contract').get(getSalariesByOnContract)
router.route('/:id').get(getDataSet).patch(updateDataSet).delete(deleteDataSet)
router.route('/').get(getAllDataSets).post(createDataSet)



module.exports = router