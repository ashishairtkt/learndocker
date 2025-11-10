# Level 1: Docker + Node.js Quick Recap & Setup

## ✅ Concepts

- Docker Images & Containers  
- Dockerfile  
- Common Commands  
- Volumes & Networks (basic)

---

## 🧪 Task

1. Ek simple Node.js app banao.  
2. Dockerfile likh ke image banao.  
3. Container run karo aur app browser me dekho.  
4. Volume attach karke code live edit karne ki practice karo.

---

## Step-by-Step Guide

### 0) Pre-reqs

- Docker installed (Docker Desktop / Docker Engine)
- Node.js installed (optional — local test)

---

### 1) Project folder setup

```bash
mkdir docker-node-quick
cd docker-node-quick
npm init -y
```

---

### 2) Create `index.js`

```js
// index.js
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<h1>Hello from Node inside Docker!</h1><p>Path: ${req.url}</p>`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

---

### 3) Add start script

```bash
npm set-script start "node index.js"
```

---

### 4) Add `.dockerignore`

```
node_modules
npm-debug.log
.DS_Store
```

---

### 5) Create Dockerfile

```Dockerfile
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev || npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

### 6) Build Docker image

```bash
docker build -t my-node-app:1.0 .
docker images
```

---

### 7) Run container (basic test)

```bash
docker run --rm -p 3000:3000 --name my-node-run my-node-app:1.0
```

Browser: `http://localhost:3000`

---

### 8) Live editing (bind mount)

#### Option A — Simple

```bash
docker run --rm -it -p 3000:3000 --name my-node-dev -v "$(pwd)":/usr/src/app -w /usr/src/app node:20-alpine sh -c "npm install && npm start"
```

#### Option B — With Nodemon

```bash
npm install --save-dev nodemon
npm set-script dev "nodemon index.js"
docker run --rm -it -p 3000:3000 --name my-node-dev -v "$(pwd)":/usr/src/app -w /usr/src/app node:20-alpine sh -c "npm install && npm run dev"
```

Optional: keep node_modules separate:

```bash
docker run --rm -it -p 3000:3000 --name my-node-dev -v "$(pwd)":/usr/src/app -v node_modules:/usr/src/app/node_modules -w /usr/src/app node:20-alpine sh -c "npm install && npm run dev"
```

---

### 9) Useful Docker Commands

| Command | Description |
|----------|--------------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker logs -f <container>` | Stream logs |
| `docker exec -it <container> sh` | Shell into container |
| `docker stop <container>` | Stop container |
| `docker rm <container>` | Remove container |
| `docker rmi <image>` | Remove image |

---

### 10) Optional: Docker Compose Setup

```yaml
version: "3.8"
services:
  app:
    image: node:20-alpine
    working_dir: /usr/src/app
    volumes:
      - ./:/usr/src/app
      - node_modules:/usr/src/app/node_modules
    ports:
      - "3000:3000"
    command: sh -c "npm install && npm run dev"
volumes:
  node_modules:
```

Run:

```bash
docker compose up
# stop: docker compose down
```

---

### 11) Troubleshooting

- **Changes not visible** → ensure correct volume path.
- **node_modules missing** → use named volume.
- **Port not accessible** → check if bound to 0.0.0.0.
- **Permission errors on Windows** → use PowerShell path or WSL.

---

### 12) Verification Checklist

- [ ] index.js runs locally
- [ ] Dockerfile + .dockerignore created
- [ ] Image builds successfully
- [ ] Container runs (`http://localhost:3000`)
- [ ] Volume + nodemon works for live edit

---

✅ **Congrats!** Tumne Level 1 complete kar liya 🎉  
Agle level me hum **Docker Compose aur multi-container setup** seekhenge (Node + MongoDB).

### Concept Meaning

- **Volume** Persistent storage managed by Docker  Volume basically ek persistent storage area hota hai jo Docker container ke bahar exist karta hai.
**Bind Mount** Local folder ko container me sync karna Tumhare local folder ka code container ke andar live reflect karega.
**Live Editing** Bind mount ke through code changes auto-reflect karna
