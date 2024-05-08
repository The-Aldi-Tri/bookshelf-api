# This Dockerfile is used to build a Docker image for a Node.js application.

# It starts with a base image of Node.js 18.13.0-slim.
FROM node:18.13.0-slim

# Create a directory for the application and set ownership to the 'node' user.
RUN mkdir -p /home/node/bookshelf-api && chown -R node:node /home/node/bookshelf-api

# Set the working directory to the application directory.
WORKDIR /home/node/bookshelf-api

# Copy package.json and package-lock.json files to the working directory.
COPY --chown=node:node package*.json .

# Switch to the 'node' user for the following commands.
USER node

# Install dependencies using npm, with caching disabled.
RUN npm install

# Copy the rest of the application files to the working directory, with ownership set to 'node' user.
COPY --chown=node:node . .

# Expose port 9000 for the application to listen on.
EXPOSE 9000

# Set the command to run when the container starts.
CMD [ "npm", "run", "start"]
