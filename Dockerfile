# Specify the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy .env file to the working directory
COPY .env ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the Vue app
RUN npm run build-only

# Set the command to run the app
CMD [ "npx", "serve", "-s", "dist", "-p", "4173" ]