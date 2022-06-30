require('express-async-errors')
const express = require('express')
const app = express()
const request = require("supertest")

const mainRouter = require('../routes/datasets')
const notFoundMiddleware = require('../middleware/not-found')
const errorHandlerMiddleware = require('../middleware/error-handler')

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
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
    const data = await request(app)
      .post("/api/v1/datasets")
      .send(payload)

    console.log(data)

    expect(data.body.dataset.name).toBe("Bolaji")
    expect(data.body.dataset).toHaveProperty("_id")
    expect(data.statusCode).toBe(201)

  })
})


describe('Should get all datasets in DB', () => { 
  it('GET /api/v1/datasets', async () => {
   const data =  await request(app).get('/api/v1/datasets')
   const count = data.text.split(',') 
   //console.log(count)
  
    // expect(data.text).toEqual(
    //  expect.arrayContaining([
    //     expect.objectContaining({
    //       id: expect.any(Number),
    //       name: expect.any(String),
    //       salary: expect.any(Number),
    //       currency: expect.any(String),
    //       department: expect.any(String),
    //       sub_department: expect.any(String),
    //       on_constract: expect.any(Boolean)
    //     })
    //   ])
    // )
  
    //expect(count.length).toBe(8)
    // expect(count).toEqual({"__v": 0, "_id": "62b53815e2d1f49c4062dc04", "currency": "INR", "department": "Engineering", "name": "Anupam", "on_contract": false, "salary": 200, "sub_department": "Platform"});
    expect(data.statusCode).toEqual(200)
    //expect(data.text).not.toBeNull()
    //expect(data.text).toContain('Bolaji')
  })
})

describe('Should get a dataset', () => {
  it('GET /api/v1/dataset/:id', async () => {
    const data = await request(app).get('/api/v1/dataset/')
    //console.log(dataset)

    expect(data.statusCode).toEqual(200)
  })
})


describe("Should update a dataset", () => {
  test("PATCH /api/v1/datasets/:id ", async () => {
    const data = await request(app)
      .patch("/api/v1/datasets/")
      .send({
        name: "Updated"
      })

    expect(data.body.name).toBe("Updated");
    expect(data.body).toHaveProperty("id");
    expect(data.body).toHaveProperty("name");
    expect(data.statusCode).toBe(200);

    // make sure we have 3 students
    // const response = await request(app).get("/students");
    // expect(response.body.length).toBe(3);
  })
})

// describe("Should delete a dataset using an ID", () => {
//   test('DELETE /api/v1/dataset/:id', async () => {
//     const newDataset = await request(app)
//       .post('/api/v1/dataset')
//       .send({
//         name: 'Another one'
//       })

//     const removedDataset = await request(app).delete(
//       `/api/v1/dataset/${newDataset.body.id}`
//     )

//     expect(removedDataset.body).toEqual({ message: "Deleted" });
//     expect(removedDataset.statusCode).toBe(200);

//     // make sure we still have 2 students
//     const response = await request(app).get("/students");
//     expect(response.body.length).toBe(2);
//   })
// })
