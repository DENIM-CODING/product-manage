FROM node:18

WORKDIR /usr/src/app

# Copy root-level package.json files
COPY package*.json ./

# Install root dependencies (e.g. express, mongoose, nodemon)
RUN npm install

# Copy the entire app (backend and frontend)
COPY . .

# Set working directory to backend if that’s where the server is
WORKDIR /usr/src/app/backend

# Expose backend port
EXPOSE 5001

CMD ["node", "server.js"]