# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY ./data/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY ./data .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run app when the container launches
CMD ["node", "server.js"]

