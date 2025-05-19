FROM node:18

# Set working directory to match your project structure
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from backend directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Define the command to run the server.js
CMD ["node", "server.js"]

# Expose the port your app runs on (modify as needed)
EXPOSE 5001