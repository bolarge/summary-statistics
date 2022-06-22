const Dataset = require('../models/Dataset')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error.js')


//Set up controllers
const getAllDataSets = asyncWrapper(async (req, res) => {
  const datasets = await Dataset.find({})
  res.status(200).json({ datasets })
})

const createDataSet = asyncWrapper(async (req, res) => {
  const dataset = await Dataset.create(req.body)
  res.status(201).json({ dataset })
})

const getDataSet = asyncWrapper(async (req, res, next) => {
  const { id: dataSetId } = req.params;
  const dataSet = await Dataset.findOne({_id: dataSetId})
  if (!dataSet) {
    return next(createCustomError(`No dataSet with id : ${dataSetId}`, 404))
  }

  res.status(200).json({ dataSet })
})

const updateDataSet = asyncWrapper(async (req, res, next) => {
  const { id: dataSetId } = req.params;
  const dataSet = await Dataset.findOneAndUpdate({_id: dataSetId}, req.body, {
    new: true,
    runValidators: true,
  })
  if (!dataSet) {
    return next(createCustomError(`No dataSet with id : ${dataSetId}`, 404))
  }

  res.status(200).json({ dataSet })
})

const deleteDataSet = asyncWrapper(async(req, res, next) => {
  const { id: dataSetId } = req.params;
  const dataSet = await Dataset.findOneAndDelete({_id: dataSetId})
  if (!dataSet) {
    return next(createCustomError(`No dataSet with id : ${dataSetId}`, 404))
  }

  res.status(200).json({ dataSet })
})

const getSalariesByOnContract = asyncWrapper(async (req, res, next) => {
  const contracted = {}
  if(req.query.on_contract){
    contracted.on_contract = req.query.on_contract === 'true'
  }
  console.log(contracted.on_contract)

   let dataSets = await Dataset.aggregate([
    { $match: {on_contract: contracted.on_contract }},
    {$group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
      averageSalary: { $avg: "$salary" },
      minimumSalary: { $min: "$salary" },
      maximumSalary: { $max: "$salary" }
    }}
    ]);

   if (!dataSets) {
    return next(createCustomError(`No dataSets found`, 404))
  }
   return res.status(200).json({ dataSets })
})

const getSalariesByDepartment = asyncWrapper(async (req, res) => {
  let dataSets = await Dataset.aggregate([
    {$group: {
      _id: '$department',
      total: { $sum: '$salary' },
      mean: { $avg: '$salary' },
      min: { $min: '$salary' },
      max: { $max: '$salary' }
    }}
    ]);

   if (!dataSets) {
    return next(createCustomError(`No dataSets found`, 404))
  }
   return res.status(200).json({ dataSets })
})



module.exports = {
  getAllDataSets,
  createDataSet,
  getDataSet,
  updateDataSet,
  deleteDataSet,
  getSalariesByOnContract,
  getSalariesByDepartment
}