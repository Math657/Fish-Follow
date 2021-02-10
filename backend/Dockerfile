FROM node:12.14.1
ARG DB
ARG TOKEN
ENV DB_CONN=$DB SECRET_KEY=$TOKEN
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
CMD npm start