# Product-API

## Prerequisites
- Yarn 
- Docker 
- Makefile

## Tech Stack
- PostgreSQL
- Docker
- NestJS
- TypeORM

## Setup development environment
- Copy `.env.example` to `.env`
- Run `docker compose up -d` or run `make up` to setup environment
- Install dependencies with `make dep` or `yarn` or `npm install`

## How to run application
- Run with `make start` or `yarn start:dev` 

## Directory structure
```
├── src
│   └── auth
│     └── dto
│       └── auth-user.dto.ts
│     └── auth.controller.ts
│     └── auth.module.ts
│     └── auth.service.ts
│     └── get-user.decorator.ts
│     └── jwt.startegy.ts
│     └── user-metadata.interface.ts
│   └── products
│     └── dto
│       └── create-product-dto.ts
│       └── update-product-dto.ts
│     └── product.entity.ts
│     └── product.controller.ts
│     └── product.module.ts
│     └── product.service.ts
│   └── user
│     └── user.controller.ts
│     └── user.module.ts
│     └── user.service.ts
├── .env.example
├── docker-compose.yml
├── Makefile
├── README.md
```

## API Reference

#### Login

```http
  POST /auth/login
```
Request body:
| Field           | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `user_id`       | `number` | **Required**. author of product |

Examples:
```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": 1
}'
```

Result
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwOTMxMiwiZXhwIjoxNjc3MjEyOTEyfQ.kjwnyaM3ttVm4SohJs9K0HrQlcj8o4qhgkgy_KW7pmE"
}
```

#### Get User

```http
  GET /user
```
Request header:
| Field           | Type           | Description              |
| :-------------- | :------------- | :----------------------- |
| `Authorization` | `Bearer token` | **Required**. user token |

Examples:
```bash
curl --location --request GET 'http://localhost:3000/user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwNjMzNiwiZXhwIjoxNjc3MjA5OTM2fQ.4OA5WbfWkGRVRnzk9nsecyXu1ZfZycQ0z6HtsoMULn4'
```

Result
```
{
  "username": "Bret",
  "email": "Sincere@april.biz"
}
```

#### Create product
```http
  POST /products
```

Request header:
| Field           | Type           | Description              |
| :-------------- | :------------- | :----------------------- |
| `Authorization` | `Bearer token` | **Required**. user token |

Request body:
| Field           | Type     | Description                          |
| :-------------- | :------- | :----------------------------------- |
| `name`          | `string` | **Required**. name of product        |
| `description`   | `string` | **Required**. description of product |
| `price`         | `number` | **Required**. price of product       |
| `stock`         | `number` | **Required**. stock of product       |

Examples:
```bash
curl --location --request POST 'http://localhost:3000/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwNjMzNiwiZXhwIjoxNjc3MjA5OTM2fQ.4OA5WbfWkGRVRnzk9nsecyXu1ZfZycQ0z6HtsoMULn4' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "sofa",
  "description": "long couch with pillow",
  "price": 20000000,
  "stock": 10
}'
```

Result
```
{
  "name": "sofa",
  "description": "long couch with pillow",
  "price": 20000000,
  "stock": 10,
  "user_id": 1,
  "id": "47016600-708b-40bb-bf5f-7ae04b3a7ef6"
}
```

#### Get products

```http
  GET /products
```

Request header:
| Field           | Type           | Description              |
| :-------------- | :------------- | :----------------------- |
| `Authorization` | `Bearer token` | **Required**. user token |

Examples:
```bash
curl --location --request GET 'http://localhost:3000/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwOTMxMiwiZXhwIjoxNjc3MjEyOTEyfQ.kjwnyaM3ttVm4SohJs9K0HrQlcj8o4qhgkgy_KW7pmE'
```

Result
```
[
  {
    "id": "47016600-708b-40bb-bf5f-7ae04b3a7ef6",
    "name": "sofa",
    "description": "long couch with pillow",
    "price": 20000000,
    "stock": 10
  }
]
```

#### Get products by id

```http
  GET /products/47016600-708b-40bb-bf5f-7ae04b3a7ef6
```

Request header:
| Field           | Type           | Description              |
| :-------------- | :------------- | :----------------------- |
| `Authorization` | `Bearer token` | **Required**. user token |

Request params:
| Field        | Type     | Description              |
| :----------- | :------- | :----------------------- |
| `product_id` | `string` | **Required**. product id |

Examples:
```bash
curl --location --request GET 'http://localhost:3000/products/47016600-708b-40bb-bf5f-7ae04b3a7ef6' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwOTMxMiwiZXhwIjoxNjc3MjEyOTEyfQ.kjwnyaM3ttVm4SohJs9K0HrQlcj8o4qhgkgy_KW7pmE'
```

Result
```
{
  "id": "47016600-708b-40bb-bf5f-7ae04b3a7ef6",
  "name": "sofa",
  "description": "long couch with pillow",
  "price": 20000000,
  "stock": 10
}
```

#### Update product stock
```http
  PATCH /products/47016600-708b-40bb-bf5f-7ae04b3a7ef6
```

Request header:
| Field           | Type           | Description              |
| :-------------- | :------------- | :----------------------- |
| `Authorization` | `Bearer token` | **Required**. user token |

Request body:
| Field           | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `stock`         | `number` | **Required**. stock of product |

Examples:
```bash
curl --location --request PATCH 'http://localhost:3000/products/47016600-708b-40bb-bf5f-7ae04b3a7ef6' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwNjMzNiwiZXhwIjoxNjc3MjA5OTM2fQ.4OA5WbfWkGRVRnzk9nsecyXu1ZfZycQ0z6HtsoMULn4' \
--header 'Content-Type: application/json' \
--data-raw '{
  "stock": 9
}'
```

Result
```
{
  "id": "47016600-708b-40bb-bf5f-7ae04b3a7ef6",
  "name": "sofa",
  "description": "long couch with pillow",
  "price": 20000000,
  "stock": 9
}
```

#### Delete product
```http
  DELETE /products/47016600-708b-40bb-bf5f-7ae04b3a7ef6
```

Request header:
| Field           | Type           | Description              |
| :-------------- | :------------- | :----------------------- |
| `Authorization` | `Bearer token` | **Required**. user token |

Examples:
```bash
curl --location --request DELETE 'http://localhost:3000/products/47016600-708b-40bb-bf5f-7ae04b3a7ef6' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJCcmV0IiwiZW1haWwiOiJTaW5jZXJlQGFwcmlsLmJpeiIsImlhdCI6MTY3NzIwNjMzNiwiZXhwIjoxNjc3MjA5OTM2fQ.4OA5WbfWkGRVRnzk9nsecyXu1ZfZycQ0z6HtsoMULn4' \
--header 'Content-Type: application/json' \
```

## Authors

- [@hutamy](https://www.github.com/hutamy)