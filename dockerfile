# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev || npm install

# Copy rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
