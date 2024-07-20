# Use node image
FROM node:20-alpine3.20

# Change the working dir from /src to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of project files to image
COPY . .

# Expose application at PORT
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]