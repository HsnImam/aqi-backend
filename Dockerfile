# Use Node.js LTS as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Use a smaller runtime image for the final stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy built application and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
