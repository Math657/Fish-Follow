FROM node:12.14.1
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
# FROM nginx:1.19.4
CMD npm run serve --mode production