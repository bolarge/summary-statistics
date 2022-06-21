//Setup server
const express = require('express')
const app = express()
const datasets = require('./routes/datasets')

app.get('/hello', (req, res) => 
res.send('Summary Statistics App'))

//Middleware
app.use(express.json())

//Route
app.get('/hello', (req, res) => {
  res.send('Summary Statistics App')
})

app.use('/api/v1/datasets', datasets)

//app.get('api/v1/datasets')
//app.post('api/v1/datasets')
//app.get('api/v1/datasets/:id')
//app.delete('api/v1/datasets/:id')



//Port
const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}...`))
