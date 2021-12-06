# syntax=docker/dockerfile:1
 
FROM node:14.17.6
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install \
    && chown node:node /app
COPY --chown=node:node . .
CMD [ "npm", "start" ]