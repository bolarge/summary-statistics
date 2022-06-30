const express = require('express')
const app = express()
const request = require("supertest")

const mainRouter = require('../routes/datasets')

const connectDB = require('../db/connect')
const Dataset = require('../models/Dataset')

const port = process.env.PORT
const start = async () => {
  try{
    await connectDB()
    app.listen(port, () => {
      console.log(`Server started SS App on port ${port}...`)
    })
  } catch(error) {
    console.log(error)
  }
}

start()

//Middleware
app.use(express.json())

//Route
app.use('/api/v1/datasets', mainRouter)

// beforeEach(async () => {
//   await Dataset.deleteMany()
// })

describe("Should create a new dataset", () => {
  it("POST /api/v1/datasets", async () => {
    const payload = {
      name: "Bolaji",
      salary: "4000000",
      currency: "NGN",
      department: "Engineering",
      sub_department: "Platform"
    }
    const postData = await request(app).post("/api/v1/datasets").send(payload)
    const data = postData._body.dataset
    console.log(data)

    expect(data.name).toBe('Bolaji')
    expect(postData.body.dataset).toHaveProperty('_id')
    expect(postData.statusCode).toBe(201)
  })
})

describe('Should get all datasets in DB', () => { 
  it('GET /api/v1/datasets', async () => {
   const data =  await request(app).get('/api/v1/datasets')
   const allData = data.text.datasets 
   console.log(allData)
  
    // expect(count).toEqual({"__v": 0, "_id": "62b53815e2d1f49c4062dc04", "currency": "INR", "department": "Engineering", "name": "Anupam", "on_contract": false, "salary": 200, "sub_department": "Platform"});
    expect(data.statusCode).toEqual(200)
    expect(data.text).not.toBeNull()
  })
})

describe('Should get a dataset', () => {
  it('GET SINGLE /api/v1/dataset/:id', async () => {
    const payload = {
      name: "Bolaji",
      salary: "4000000",
      currency: "NGN",
      department: "Engineering",
      sub_department: "Platform"
    }

    const updatedDataset = await request(app).post("/api/v1/datasets").send(payload)
    const updatedData = updatedDataset._body.dataset
    console.log(updatedData)

    const data = await request(app).get(`/api/v1/datasets/${updatedData._id}`)
    
    expect(data.statusCode).toEqual(200)
    expect(data.text).not.toBeNull()
  })
})

describe("Should update a dataset", () => {
  test("PATCH /api/v1/datasets/:id ", async () => {
    const payload = {
      name: "Bolaji",
      salary: "4000000",
      currency: "NGN",
      department: "Engineering",
      sub_department: "Platform"
    }

    const updatedDataset = await request(app).post("/api/v1/datasets").send(payload)
    const updatedData = updatedDataset._body.dataset

    const patchedData = await request(app).patch(`/api/v1/datasets/${updatedData._id}`).send({name: 'Demola'})
    const data = patchedData._body.dataset
    console.log(data)

    expect(data.name).toBe('Demola')
    expect(patchedData.statusCode).toBe(200)
  })
})

describe("Should delete a dataset using an Id", () => {
  test('DELETE /api/v1/dataset/:id', async () => {
    const payload = {
      name: "Bolaji",
      salary: "4000000",
      currency: "NGN",
      department: "Engineering",
      sub_department: "Platform"
    }

    const updatedDataset = await request(app).post("/api/v1/datasets").send(payload)
    const updatedData = updatedDataset._body.dataset

    const deletedData = await request(app).delete(`/api/v1/datasets/${updatedData._id}`)
    const data = deletedData._body.dataset
    console.log(data)

    expect(deletedData.statusCode).toBe(200)
  })
})
