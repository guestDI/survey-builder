# Use the official Node.js image as the base image
FROM node:18 as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install -g ember-cli@latest
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Ember app
CMD ["npm", "run", "start"]
