# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Generate Prisma client and build Next.js app (skip lint)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
