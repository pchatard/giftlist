FROM node:16.14 as builder

# Create app directory
WORKDIR /opt/app

# Install all to build
COPY src src
COPY tsconfig.json .
COPY package.json .
COPY package-lock.json .

# Building your code for production
RUN ls && ls src
RUN npm install && npm run build

FROM node:16.14 as runner

# Create app directory
WORKDIR /opt/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Building your code for production
RUN curl --create-dirs -o /certs/root.crt -O https://cockroachlabs.cloud/clusters/f82eaea0-cfe2-4492-aa07-e986cd93e46d/cert &&\
  npm ci --only=production  

# Bundle app source
COPY --from=builder /opt/app/build .

EXPOSE 443
CMD [ "node", "index.js" ]
