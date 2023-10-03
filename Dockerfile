FROM node:16-alpine
EXPOSE 3000
WORKDIR /react-docker-example/
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/
RUN npm install
CMD ["npm", "start"]