FROM node:14-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install specific version of expo-cli known to work with SDK 32
RUN npm install -g expo-cli@2.6.14
RUN npm install

# Copy app files
COPY . .

# Expose both Metro bundler port and Expo dev server port
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Start Expo in development mode
CMD ["expo", "start", "--host", "0.0.0.0"] 