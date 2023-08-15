# Kampas API Documentation 


## List of Available Endpoints:
----

**1 GET /articles**

**2 POST /articles**

**3 GET /articles/:id**

**4 DELETE /articles/:id**

**5 GET /categories**

**6 GET /categories**

**7 POST /users**

---

**8 POST /register**

**9 POST /login**

**10 POST /auth/google-sign-in**

---
**11. PUT /articles/:id**

**12. PATCH /articles/:id**

**13. GET /histories**

---

### 1. GET /articles

#### Description

- Get all articles data

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "message": [
    {
        "title": "Saham YG Entertainment Anjlok Gara-gara G-Dragon Keluar dari Agensi",
        "content": "Dalam hitungan dua hari setelah laporan kontrak G-Dragon, saham perusahaan turun 6.600 won (sekitar Rp76.000). Di mana sebelumnya mencapai 91.200 won (sekitar Rp1 juta) menjadi 84.600 won (sekitar Rp976 ribu), turun 7,14% dari hari perdagangan sebelumnya. Hari berikutnya terus jatuh ke 81,300 won (sekitar Rp938 ribu), turun 3,19%.",
        "imgUrl": "https://disk.mediaindonesia.com/thumbs/700x-/news/2023/06/3c6e14b87b3b5d3a2d2b291cecf23e3d.jpg",
        "categoryId": 3,
        "authorId": 2,
        "createdAt": "2023-06-17T10:20:01.520Z",
        "updatedAt": "2023-06-17T10:20:01.520Z"
    },
    {
        "title": "Blackpink in your air-ea: the K-pop girl group’s faces are now on one of Korean Air’s planes",
        "content": "The Blackpink-themed plane was unveiled by Korean Air vice president Cho Won Tae and South Korean Prime Minister Han Deok Soo. The plane was made to promote the city of Busan’s candidacy to host Expo 2030, a world’s fair that is set to happen within the aforementioned year. Busan is facing off against other cities like Riyadh, Rome, and Odessa, with the host city set to be confirmed sometime this year.",
        "imgUrl": "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2023/05/09161026/344545081_908008196923597_5960522570524992351_n-1536x905.jpeg",
        "categoryId": 2,
        "authorId": 1,
        "createdAt": "2023-06-17T10:20:01.520Z",
        "updatedAt": "2023-06-17T10:20:01.520Z"
    },
    {
        "title": "Girls' Generation's Taeyeon is the new muse of 'Benefit Cosmetics' in Korea",
        "content": "The cosmetics brand revealed on April 19, 'We chose Taeyeon as our new muse as we felt that Taeyeon, who has been named as a wannabe role model throughout the years for her unrivaled artistry, matched well with the unique mood of Benefit.'",
        "imgUrl": "https://www.allkpop.com/upload/2022/04/content/182347/1650340057-20220418-taeyeon.jpg",
        "categoryId": 1,
        "authorId": 3,
        "createdAt": "2023-06-17T10:20:01.520Z",
        "updatedAt": "2023-06-17T10:20:01.520Z"
    }
]
}
```

### 2. POST /articles

#### Description

- Post a new article

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "title": String,
  "content": String,
  "imgUrl": String,
  "categoryId": Integer,
}
```

#### Response

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "message": {
    "title": String,
    "content": String,
    "imgUrl": String,
    "categoryId": Integer,
    "authorId": Integer,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```

_400 - Bad Request_

- Body

```json
{
  "statusCode": 400,
  "msg": "title article cannot be empty"
}
OR
{
  "msg": "content article cannot be empty"
}
```

---

### 3. GET /articles/:id

#### Description

- Get Articles by id

#### Request


- Headers

```json
{
  "access_token": String
}
```

- Params

```json
{
  "id": "integer (required)"
}
```

#### Response

_200 - Success_

- Body

```json
{
  "message": {
    "title": "Girls' Generation's Taeyeon is the new muse of 'Benefit Cosmetics' in Korea",
    "content": "The cosmetics brand revealed on April 19, 'We chose Taeyeon as our new muse as we felt that Taeyeon, who has been named as a wannabe role model throughout the years for her unrivaled artistry, matched well with the unique mood of Benefit.'",
    "imgUrl": "https://www.allkpop.com/upload/2022/04/content/182347/1650340057-20220418-taeyeon.jpg",
    "categoryId": 1,
    "authorId": 3,
    "createdAt": "2023-06-17T10:20:01.520Z",
    "updatedAt": "2023-06-17T10:20:01.520Z"
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "message": "Article (id) not found"
}
```

---

### 4. DELETE /articles/:id

#### Description

- Delete article by id

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Params

```json
{
  "id": "integer (required)"
}
```

#### Response

_200 - Success_

```json
{
  "message": "(title article) success to delete"
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "message": "Article (id) not found"
}
```

---

### 5. GET /categories

#### Description

- Get all categories data

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - Success_

```json
{
  "message": [
    {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2023-06-17T10:20:01.520Z",
      "updatedAt": "2023-06-17T10:20:01.520Z"
    },
    {
      "id": 2,
      "name": "Travel",
      "createdAt": "2023-06-17T10:20:01.520Z",
      "updatedAt": "2023-06-17T10:20:01.520Z"
    },
    {
      "id": 3,
      "name": "Economi",
      "createdAt": "2023-06-17T10:20:01.520Z",
      "updatedAt": "2023-06-17T10:20:01.520Z"
    }
  ]
}
```

---

### 6. POST /categories

#### Description

- Post a new category

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "name": String
}
```

#### Response

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "message": {
    "name": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```

_400 - Bad Request_

- Body

```json
{
  "statusCode": 400,
  "msg": "category name cannot be empty"
}
OR
{
  "msg": "category name cannot be empty"
}
```

---

### 7. GET /users

#### Description

- Get all users data

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - Success_

```json
{
  "message": [
    {
        "username": "croundtree0",
        "email": "mstandall0@webnode.com",
        "password": "cI1$IT",
        "role": "staff",
        "phoneNumber": "+7 930 767 3416",
        "address": "35147 Muir Junction",
        "createdAt": "2023-06-17T10:20:01.520Z",
        "updatedAt": "2023-06-17T10:20:01.520Z"
    },
    {
        "username": "ltribbeck1",
        "email": "tbracey1@kickstarter.com",
        "password": "iR4`?",
        "role": "staff",
        "phoneNumber": "+46 212 484 3293",
        "address": "497 8th Center",
        "createdAt": "2023-06-17T10:20:01.520Z",
        "updatedAt": "2023-06-17T10:20:01.520Z"
    },
    {
        "username": "kcaselick2",
        "email": "mbartul2@naver.com",
        "password": "lI2'+sC)",
        "role": "staff",
        "phoneNumber": "+57 676 258 4843",
        "address": "84 Declaration Street",
        "createdAt": "2023-06-17T10:20:01.520Z",
        "updatedAt": "2023-06-17T10:20:01.520Z"
    }
]
}
```

---

### 8. POST /register

#### Description

- POST a new registered users

#### Request

- Body

```json
{
  "email": String,
  "password": String,
}
```

#### Response

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "message": {
    "id": Integer,
    "email": String,
  }
}
```

_400 - Bad Request_

- Body

```json
{
  "statusCode": 400,
  "msg": "email cannot be empty"
}
OR
{
  "msg": "Format email tidak valid!"
}
OR
{
  "msg": "password cannot be empty"
}
OR
{
  "msg": "The password must have a minimum of 5 characters"
}
```

---

### 9. POST /login

#### Description

- POST a new login users

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_200 - Success_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJvbiByb3NlIiwiaWQiOjUsImVtYWlsIjoic2hhcm9ucm9zZTk5MjZAZ21haWwuY29tIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNjg2OTAzOTI3fQ.CHvBEwa93-FjskR0oMqq7aZu9FfYOmo_Btlx3ppqeQg"
}
```

_401 - Unauthenticated_

- Body

```json
{
  "statusCode": 401,
  "message": "Error invalid username or email or password"
}
OR
{
  "message": "Please login first!"
}
OR
{
  "message": "Error login user not found"
}
```

_403 - Forbidden_

- Body

```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

---

### 10. POST /auth/google-sign-in

#### Description

- POST by google login

#### Response:

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJvbiByb3NlIiwiaWQiOjUsImVtYWlsIjoic2hhcm9ucm9zZTk5MjZAZ21haWwuY29tIiwicm9sZSI6InN0YWZmIiwiaWF0IjoxNjg2OTAzOTI3fQ.CHvBEwa93-FjskR0oMqq7aZu9FfYOmo_Btlx3ppqeQg",
  "email": "sharonrose9926@gmail.com",
  " username": "Sharon Rose",
  "role": "staff"
}
```

---

### Global Error

### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```

---

### 11. PUT /articles/:id

#### Description

- Edit an article

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "title": String,
  "content": String,
  "imgUrl": String,
  "categoryId": Integer,
}
```

#### Response

_201 - Created_

- Body

```json
{
  "message": "Data with id <id> is succeed to edit"
}
```

_404 - Not Found_

- Body

```json
{
  "message": "Article not found"
}
```

---
### 12. PATCH /articles/:id

#### Description

- Edit status in article

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "status": String
}
```

#### Response

_200 - Ok_

- Body

```json
{
  "message": "Data with id <id> has changed its status to <status>"
}
```

_404 - Not Found_

- Body

```json
{
  "message": "Article not found"
}
```

---

### 13. GET /histories

#### Description

- Get all histories data

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - Success_

```json
{
  "message": [
    {
      "id": 15,
      "title": "Girls' Generation's Taeyeon is the new muse of 'Benefit Cosmetics' in Korea",
      "description": "Article Test1 has successfully created",
      "updatedBy": "sharonrose9926@gmail.com",
      "createdAt": "2023-06-24T06:58:50.026Z",
      "updatedAt": "2023-06-24T06:58:50.026Z"
    },
    {
      "id": 20,
      "name": "Blackpink in your air-ea: the K-pop girl group’s faces are now on one of Korean Air’s planes",
      "description": "Article status with id <id> has been updated from Active into Inactive",
      "updatedBy": "sharonrose9926@gmail.com",
      "createdAt": "2023-06-17T10:20:01.520Z",
      "updatedAt": "2023-06-17T10:20:01.520Z"
    }
  ]
}
```

---

### Global Error

### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
