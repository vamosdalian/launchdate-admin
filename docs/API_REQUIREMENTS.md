# Backend API Requirements

This document outlines the API endpoints required by the LaunchDate Admin Panel.

## Base URL

The backend API should be accessible at the URL configured in the environment variable:
```
VITE_API_BASE_URL (default: http://localhost:8080)
```

## API Endpoints

All endpoints should return JSON responses and accept JSON request bodies where applicable.

### 1. Rockets API

#### GET /api/rockets
Returns a list of all rockets.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "height": "number",
    "diameter": "number",
    "mass": "number",
    "company": "string",
    "imageUrl": "string",
    "active": "boolean"
  }
]
```

#### GET /api/rockets/:id
Returns a single rocket by ID.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "height": "number",
  "diameter": "number",
  "mass": "number",
  "company": "string",
  "imageUrl": "string",
  "active": "boolean"
}
```

#### POST /api/rockets
Creates a new rocket.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "height": "number",
  "diameter": "number",
  "mass": "number",
  "company": "string",
  "imageUrl": "string",
  "active": "boolean"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "height": "number",
  "diameter": "number",
  "mass": "number",
  "company": "string",
  "imageUrl": "string",
  "active": "boolean"
}
```

#### PUT /api/rockets/:id
Updates an existing rocket.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "height": "number",
  "diameter": "number",
  "mass": "number",
  "company": "string",
  "imageUrl": "string",
  "active": "boolean"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "height": "number",
  "diameter": "number",
  "mass": "number",
  "company": "string",
  "imageUrl": "string",
  "active": "boolean"
}
```

#### DELETE /api/rockets/:id
Deletes a rocket.

**Response:**
```json
{}
```

---

### 2. Launches API

#### GET /api/launches
Returns a list of all launches.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "date": "string (ISO 8601 datetime)",
    "rocket": "string",
    "launchBase": "string",
    "status": "scheduled | successful | failed | cancelled",
    "description": "string"
  }
]
```

#### GET /api/launches/:id
Returns a single launch by ID.

#### POST /api/launches
Creates a new launch.

**Request Body:**
```json
{
  "name": "string",
  "date": "string (ISO 8601 datetime)",
  "rocket": "string",
  "launchBase": "string",
  "status": "scheduled | successful | failed | cancelled",
  "description": "string"
}
```

#### PUT /api/launches/:id
Updates an existing launch.

#### DELETE /api/launches/:id
Deletes a launch.

---

### 3. News API

#### GET /api/news
Returns a list of all news articles.

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "summary": "string",
    "content": "string (optional, markdown)",
    "date": "string (ISO 8601 datetime)",
    "url": "string",
    "imageUrl": "string"
  }
]
```

#### GET /api/news/:id
Returns a single news article by ID.

#### POST /api/news
Creates a new news article.

**Request Body:**
```json
{
  "title": "string",
  "summary": "string",
  "content": "string (optional, markdown)",
  "date": "string (ISO 8601 datetime)",
  "url": "string",
  "imageUrl": "string"
}
```

#### PUT /api/news/:id
Updates an existing news article.

#### DELETE /api/news/:id
Deletes a news article.

---

### 4. Launch Bases API

#### GET /api/launch-bases
Returns a list of all launch bases.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "location": "string",
    "country": "string",
    "description": "string",
    "imageUrl": "string",
    "latitude": "number",
    "longitude": "number"
  }
]
```

#### GET /api/launch-bases/:id
Returns a single launch base by ID.

#### POST /api/launch-bases
Creates a new launch base.

**Request Body:**
```json
{
  "name": "string",
  "location": "string",
  "country": "string",
  "description": "string",
  "imageUrl": "string",
  "latitude": "number",
  "longitude": "number"
}
```

#### PUT /api/launch-bases/:id
Updates an existing launch base.

#### DELETE /api/launch-bases/:id
Deletes a launch base.

---

### 5. Companies API

#### GET /api/companies
Returns a list of all companies.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "founded": "number (year)",
    "founder": "string",
    "headquarters": "string",
    "employees": "number",
    "website": "string",
    "imageUrl": "string"
  }
]
```

#### GET /api/companies/:id
Returns a single company by ID.

#### POST /api/companies
Creates a new company.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "founded": "number (year)",
  "founder": "string",
  "headquarters": "string",
  "employees": "number",
  "website": "string",
  "imageUrl": "string"
}
```

#### PUT /api/companies/:id
Updates an existing company.

#### DELETE /api/companies/:id
Deletes a company.

---

### 6. Statistics API

#### GET /api/stats
Returns dashboard statistics.

**Response:**
```json
{
  "totalRockets": "number",
  "upcomingLaunches": "number",
  "newsArticles": "number",
  "launchBases": "number",
  "companies": "number"
}
```

---

## Error Handling

All endpoints should return appropriate HTTP status codes:
- 200: Success
- 201: Created (for POST requests)
- 400: Bad Request (invalid data)
- 404: Not Found
- 500: Internal Server Error

Error responses should follow this format:
```json
{
  "message": "Error description"
}
```

## CORS

The backend should enable CORS to allow requests from the admin panel frontend.

## Authentication

Currently, the admin panel does not implement authentication. This should be added in future versions for production use.
