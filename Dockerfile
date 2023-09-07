# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY ./packages/backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application code to the container
COPY ./packages/backend ./

# Expose the port your backend server will run on
EXPOSE 3000

# Command to start your backend application
CMD ["npm", "start"]
