# Todo API

A RESTful API for managing todos built with Node.js, Express, TypeScript, and MySQL.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run with Docker:
```bash
docker-compose up --build
```

3. Run migrations:
```bash
npx sequelize-cli db:migrate
```

## API Endpoints

Base URL: `http://localhost:5000/api/v1/todo`

### 1. Get All Todos

**GET** `/api/v1/todo`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the todo API",
      "completed": false,
      "created_at": "2026-03-09T08:30:00.000Z",
      "updated_at": "2026-03-09T08:30:00.000Z"
    }
  ]
}
```

### 2. Create Todo

**POST** `/api/v1/todo`

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the todo API",
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo API",
    "completed": false,
    "created_at": "2026-03-09T08:30:00.000Z",
    "updated_at": "2026-03-09T08:30:00.000Z"
  }
}
```

### 3. Get Todo by ID

**GET** `/api/v1/todo/:id`

**Example:** `GET /api/v1/todo/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo API",
    "completed": false,
    "created_at": "2026-03-09T08:30:00.000Z",
    "updated_at": "2026-03-09T08:30:00.000Z"
  }
}
```

### 4. Update Todo

**PUT** `/api/v1/todo/:id`

**Example:** `PUT /api/v1/todo/1`

**Request Body:**
```json
{
  "title": "Complete project - Updated",
  "description": "Finish the todo API with tests",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project - Updated",
    "description": "Finish the todo API with tests",
    "completed": true,
    "created_at": "2026-03-09T08:30:00.000Z",
    "updated_at": "2026-03-09T09:15:00.000Z"
  }
}
```

### 5. Delete Todo

**DELETE** `/api/v1/todo/:id`

**Example:** `DELETE /api/v1/todo/1`

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Todo not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Title is required"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": {}
}
```

## Testing with cURL

### Create a todo:
```bash
curl -X POST http://localhost:5000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{"title":"My first todo","description":"Test description","completed":false}'
```

### Get all todos:
```bash
curl http://localhost:5000/api/v1/todo
```

### Get todo by ID:
```bash
curl http://localhost:5000/api/v1/todo/1
```

### Update a todo:
```bash
curl -X PUT http://localhost:5000/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated todo","description":"Updated description","completed":true}'
```

### Delete a todo:
```bash
curl -X DELETE http://localhost:5000/api/v1/todo/1
```
