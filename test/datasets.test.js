//process.env.NODE_ENV = 'test'
const request = require("supertest")
const app = require("../app")
require('../db/connect')

const Dataset = require('../models/Dataset')

// describe("Test the root path", () => {
//   test("It should response the GET method", done => {
//     request(app)
//       .get("/")
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });

//Promise Approach
// describe("Test the root path", () => {
//   test("It should response the GET method", () => {
//     return request(app)
//       .get("/")
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//       });
//   });
// });

//Async Await Approach
// describe("Test the root path", () => {
//   test("It should response the GET method", async () => {
//     const response = await request(app).get("/");
//     expect(response.statusCode).toBe(200);
//   });
// });

//Supertest Approach
// describe("Test the root path", () => {
//   test("It should response the GET method", () => {
//     return request(app)
//       .get("/")
//       .expect(200);
//   });
// });

//Tear down
// beforeEach(() => {
//   require('../db/connect')
// })
//afterEach(async () => await await Dataset.deleteMany())

//afterAll(async () => await Dataset.db.close())

// describe("GET / ", () => {
//   test("It should respond with an array of students", async () => {
//     const response = await request(app).get("/");
//     expect(response.body.students).toEqual(["Elie", "Matt", "Joel", "Michael"]);
//     expect(response.statusCode).toBe(200);
//   })
// })

const one = {
  name: "Anupam",
  salary: "200",
  currency: "INR",
  department: "Engineering",
  sub_department: "Platform"
}

// describe("Datasets.js", () => {
//   test("should just insert to be db", async () => {
//     const dataset = new Dataset(one)
//     await dataset.save()
//   })
// })

describe("POST /api/v1/datasets", () => {
  test("It responds with the newly created dataset", async () => {
    const response = await request(app).post("/api/v1/datasets/").send({
        name: "Anupam",
        salary: "200",
        currency: "INR",
        department: "Engineering",
        sub_department: "Platform"
      })
      console.log(response)
    // make sure we add it correctly
    //expect(newDataset.body).toHaveProperty("id");
    expect(response.body.name).toBe("Anupam");
    expect(response.statusCode).toBe(201);

    // make sure we have 1 Datasets now
    //const response = await request(app).get("/api/v1/datasets");
    //expect(response.body.length).toBe(1);
  })
})