# summary-statistics
A service useful to derive simplified summary statistics

## Project Setup
To run, ensure to have docker and docker compose running on local device. Project can be ran in the following modes; docker-compose, development and test. Each mode is supported by their configuration and issued from the command line.

### Start summary-statisticsapp with docker-compose
````
docker-compose up
Instance will run on Port 6868
````
### Stop summmary-statisticapp with docker-compose
````
docker-compose down
````
### Start Dev mode
````
export NODE_ENV=dev
npm run dev
Instance will run on Port 3000
````
### Stop Dev mode
````
npm stop dev
````
### Run Test Script
````
export NODE_ENV=test
npm run test
````
### Stop Test
````
Press q from command prompt
````
## Summary Statistics RESTful API
The API provides the following endpoint interfaces

### Identity and Security Service Operations 
** POST /api/v1/datasets/users **

Request:
```
Headers:
Accept: application/json
Content-Type: application/json
Body: {\"name\":\"John Doe\",\"email\":\"jdoe@gmail.com\",\"password\":\"XXXXXXXXXX\"}
```

User success response:
```
Code: 200
Body: {{
    "user": {
        "name": "John Doe",
        "userId": "62c5aad0131e40f7976f9ede",
        "role": "user"
    }
}
```

** POST /api/v1/datasets/login **

Request:
```
Headers:
Accept: application/json
Content-Type: application/json
Body: {\"email\":\"jdoe@gmail.com\",\"password\":\"xxxxxxxxxx\"}
```
Login success response:
```
Code: 200
Body: {
    "user": {
        "name": "John Doe",
        "userId": "62c5868be663a5ba517eeb31",
        "role": "admin"
    }
}
```
Login incorrect response:
```
Code: 401
Body: { "msg": "Invalid Credentials" }
```
Login error reponse:
```
Code: 400
Body: { "msg": "Please provide email and/or password" }
```
### User Service Operations 
** Get /api/v1/datasets **

Request:
```
Headers:
Accept: application/json
Content-Type: application/json
Body: {}
```

User success response:
```
Code: 200
Body: {
    "users": [
        {
            "role": "user",
            "_id": "62c5aad0131e40f7976f9ede",
            "name": "John Doe",
            "email": "jdoe@gmail.com"
        }
    ]
}
```

### Datasets service operations
** POST /api/v1/dataset **

Request:
```
Headers:
Accept: application/json
Content-Type: application/json
Body: {
"name": "Dayo",
"salary": "340000",
"currency": "NGN",
"department": "Accounting",
"sub_department": "Finance"
}
```
Datasets success response:
```
Code: 200
Body: {
    "dataset": {
        "on_contract": false,
        "_id": "62c5b3afd6944afe90bf9a45",
        "name": "Dayo",
        "salary": 340000,
        "currency": "NGN",
        "department": "Accounting",
        "sub_department": "Finance",
        "__v": 0
    }
}
```
Datasets incorrect response:
```
Code: 200
Body: {"msg": "Authentication Invalid"}
```

### Tech Stack
* Node
* Express
* MongoDB
* Mongoose
* Jest
* Supertest
* Docker
* Docker Compose


