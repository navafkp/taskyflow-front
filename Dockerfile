FROM node:18.18.0-alpine
WORKDIR /front
COPY package*.json /front/
RUN npm install
COPY . /front/
EXPOSE 3000
CMD ["npm", "start"]

