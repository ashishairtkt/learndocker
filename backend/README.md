# 🐳 Node.js + MongoDB Docker Compose Setup

## 🚀 Overview

This project demonstrates how to set up a **Node.js + MongoDB** application using **Docker Compose**.  
It includes multi-container orchestration, environment variables, and MongoDB initialization script.

---

## 🗂 Folder Structure

```
docker-compose-node-mongo/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── .env
│
├── mongo-init/
│   └── init.js
│
└── docker-compose.yml
```

---

## ⚙️ Step-by-Step Setup

### 1️⃣ Create `.env` inside backend

```
PORT=3000
MONGO_URL=mongodb://mongo:27017/testdb
```

### 2️⃣ Create `backend/index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('🚀 Node.js + MongoDB + .env + init script running inside Docker Compose!');
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
```

### 3️⃣ Create `backend/package.json`

```json
{
  "name": "docker-compose-node-mongo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.0.3"
  }
}
```

### 4️⃣ Create `backend/Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### 5️⃣ Create `mongo-init/init.js`

```js
db = db.getSiblingDB('testdb');

db.users.insertMany([
  { name: 'Ravi', role: 'Admin' },
  { name: 'Neha', role: 'User' }
]);

print('✅ Default users added to MongoDB!');
```

### 6️⃣ Create `docker-compose.yml`

```yaml
version: "3"

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    env_file:
      - ./backend/.env
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
      - ./mongo-init:/docker-entrypoint-initdb.d

volumes:
  mongo-data:
```

---

## ▶️ Run the Project

```bash
docker compose up --build
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

You should see:

```
🚀 Node.js + MongoDB + .env + init script running inside Docker Compose!
```

---

## 🧪 Verify MongoDB Data

```bash
docker exec -it <mongo_container_name> mongosh
use testdb
db.users.find()
```

Expected output:

```json
[
  { "_id": ObjectId(...), "name": "Ravi", "role": "Admin" },
  { "_id": ObjectId(...), "name": "Neha", "role": "User" }
]
```

---

## 🧹 Stop and Clean Up

```bash
docker compose down
```

---

## 🏁 Summary

✅ Multi-container setup using Docker Compose  
✅ Environment variables with `.env`  
✅ MongoDB initialized with default data  
✅ Persistent volume for MongoDB data

---
