# Use an official Node.js runtime as the base image
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./
# If using Yarn, use: COPY package.json yarn.lock ./

# Install dependencies
RUN npm install
# If using Yarn, use: RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Vite app for production

RUN npm run build
# If using Yarn, use: RUN yarn build

# Use a lightweight web server to serve the built app
FROM node:22 AS serve

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist /app

# Expose the port the app will run on
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", ".", "-l", "3000"]