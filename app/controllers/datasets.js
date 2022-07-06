const Dataset = require('../models/Dataset')
const asyncWrapper = require('../middleware/async')
const CustomError = require('../errors')
const Validator = require('../validation/validator')

//Set up controllers
const getAllDataSets = asyncWrapper(async (req, res) => {
  const datasets = await Dataset.find({})
  res.status(200).json({ datasets })
})

const createDataSet = asyncWrapper(async (req, res) => {
  let newDataset = req.body
  newDataset = Validator.validatePayload(newDataset, Validator.DatasetValidation)
  const dataset = await Dataset.create(newDataset)
  res.status(201).json({ dataset })
})

const getDataSet = asyncWrapper(async (req, res, next) => {
  const { id: dataSetId } = req.params;
  const dataset = await Dataset.findOne({_id: dataSetId})
  if (!dataset) {
   throw new CustomError.NotFoundError(`No dataset with id : ${dataSetId}`)
  }
  res.status(200).json({ dataset })
})

const updateDataSet = asyncWrapper(async (req, res, next) => {
  const { id: dataSetId } = req.params;
  const dataset = await Dataset.findOneAndUpdate({_id: dataSetId}, req.body, {
    new: true,
    runValidators: true,
  })
  if (!dataset) {
    throw new CustomError.NotFoundError(`No dataSet with id : ${dataSetId}`);
  }

  res.status(200).json({ dataset })
})

const deleteDataSet = asyncWrapper(async(req, res, next) => {
  const { id: dataSetId } = req.params;
  const dataset = await Dataset.findOneAndDelete({_id: dataSetId})
  if (!dataset) {
    throw new CustomError.NotFoundError(`No dataSet with id : ${dataSetId}`);
  }

  res.status(200).json({ dataset })
})

const getSalariesByOnContract = asyncWrapper(async (req, res, next) => {
  const contracted = {}
  if(req.query.on_contract){
    contracted.on_contract = req.query.on_contract === 'true'
  }
  console.log(contracted.on_contract)

   let datasets = await Dataset.aggregate([
    { $match: {on_contract: contracted.on_contract }},
    {$group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
      averageSalary: { $avg: "$salary" },
      minimumSalary: { $min: "$salary" },
      maximumSalary: { $max: "$salary" }
    }}
    ]);

   if (!datasets) {
    throw new CustomError.NotFoundError(`No datasets found`)
  }
   return res.status(200).json({ datasets })
})

const getSalariesByDepartment = asyncWrapper(async (req, res) => {
  let datasets = await Dataset.aggregate([
    {$group: {
      _id: '$department',
      total: { $sum: '$salary' },
      mean: { $avg: '$salary' },
      min: { $min: '$salary' },
      max: { $max: '$salary' }
    }}
    ]);

   if (!datasets) {
    throw new CustomError.NotFoundError(`No datasets found`)
  }
   return res.status(200).json({ datasets })
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