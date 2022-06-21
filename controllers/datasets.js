


//Set up controllers
const getAllDataSets = (req, res) => {
  res.send('get all datasets')
}

const createDataSet = (req, res) => {
  res.json(req.body)
}

const getDataSet = (req, res) => {
  res.json({id: req.params.id})
}

const updateDataSet = (req, res) => {
  res.send('update a dataset')
}

const deleteDataSet = (req, res) => {
  res.send('delete a dataset')
}

module.exports = {
  getAllDataSets,
  createDataSet,
  getDataSet,
  updateDataSet,
  deleteDataSet
}