FROM node:20.9.0
LABEL maintainer="Bruno Paolo"

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . . 

USER node

CMD ["npm", "run", "start"]
