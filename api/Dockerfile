FROM node:16.14

# Create app directory
WORKDIR /opt/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Building your code for production
RUN npm ci --only=production

# Bundle app source
COPY ./build .

CMD [ "node", "index.js" ]
