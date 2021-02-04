# FROM node:12.14.1
# WORKDIR /app/
# COPY package.json package-lock.json /app/
# RUN npm install
# COPY . /app
# # FROM nginx:1.19.4
# CMD npm run serve

# build stage
FROM node:12.14.1 as build-stage
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

# production stage
FROM nginx:1.19.4 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]