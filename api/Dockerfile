FROM node:16.14

# Create app directory
WORKDIR /opt/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

# Building your code for production
RUN curl --create-dirs -o /certs/root.crt -O https://cockroachlabs.cloud/clusters/f82eaea0-cfe2-4492-aa07-e986cd93e46d/cert &&\
  npm ci --only=production  &&\
  npm run build

# Bundle app source
# COPY ./build .

CMD [ "node", "index.js" ]
