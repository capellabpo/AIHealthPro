# ---- Build Stage ----
FROM node:slim AS build-stage

# Set working directory
WORKDIR /app

# Install system dependencies, including Python
RUN apt-get update && apt-get install -y python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine3.18 as production-stage

# Copy the built app to nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx without daemon mode
CMD ["nginx", "-g", "daemon off;"]
