const express = require('express')

const router = express.Router();

const {
  getAllDataSets,
  createDataSet,
  getDataSet,
  updateDataSet,
  deleteDataSet
} = require('../controllers/datasets')

router.route('/').get(getAllDataSets).post(createDataSet)
router.route('/:id').get(getDataSet).patch(updateDataSet).delete(deleteDataSet)

module.exports = router