# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Stage 1: Build the application using Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY src ./src

# Build the project
RUN npm run build

# Stage 2: Create a lightweight image for production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/build ./build

# Copy necessary files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Environment variables
ENV NODE_ENV=production

# Entrypoint command to run the MCP server
ENTRYPOINT ["node", "build/index.js"]

# Command to start the server
CMD ["node", "build/index.js"]
