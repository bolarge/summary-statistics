# summary-statistics
A service useful to derive simplified summary statistics

## Project Setup
To run, ensure to have docker and docker compose running on local device. Project can be ran in the following modes; docker-compose, development and test. Each mode is supported by their configuration and issued from the command line.

### Start docker-compose
````
cd summary-statistics
docker-compose up
Instance will run on Port 6868
````
### Stop docker-compose
````
docker-compose down
````
### Start Dev mode
````
cd summary-statistics/app
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
cd summary-statistics
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
Authorization: Bearer eyXXXXXXXXXXXXXXX

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
Authorization: Bearer eyXXXXXXXXXXXXXXX

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
Authorization: Bearer eyXXXXXXXXXXXXXXX

Body: {
"name": "John Doe",
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
        "name": "John Doe",
        "salary": 340000,
        "currency": "NGN",
        "department": "Accounting",
        "sub_department": "Finance"
    }
}
```
Datasets incorrect response:
```
Code: 200
Body: {"msg": "Authentication Invalid"}
```

```
Code: 400
Body: {"msg": "Error name is required"}
```

*** GET /api/v1/datasets/contract?on_contract=true
Request:
```
Headers:
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyXXXXXXXXXXXXXXX

Body: {}
```
Datasets success response:
```
Code: 200
Body:{
    "datasets": [
        {
            "_id": null,
            "totalSalary": 200000,
            "averageSalary": 100000,
            "minimumSalary": 90000,
            "maximumSalary": 110000
        }
    ]
}
```
*** GET /api/v1/datasets/department
Request:
```
Headers:
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyXXXXXXXXXXXXXXX

Body: {}
```
Datasets success response:
```
Code: 200
Body:{
    "datasets": [
        {
            "_id": "Accounting",
            "total": 970000,
            "mean": 323333.3333333333,
            "min": 290000,
            "max": 340000
        },
        {
            "_id": "Engineering",
            "total": 210255030,
            "mean": 35042505,
            "min": 30,
            "max": 200000000
        },
        {
            "_id": "Administration",
            "total": 30,
            "mean": 30,
            "min": 30,
            "max": 30
        },
        {
            "_id": "Operations",
            "total": 70030,
            "mean": 35015,
            "min": 30,
            "max": 70000
        },
        {
            "_id": "Banking",
            "total": 90000,
            "mean": 90000,
            "min": 90000,
            "max": 90000
        }
    ]
}
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


