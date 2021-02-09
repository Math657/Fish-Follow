FROM node:12.14.1
ARG DB
ENV DB_CONN=$DB
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
CMD npm start