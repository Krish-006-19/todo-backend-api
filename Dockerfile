FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:22-alpine AS production
WORKDIR /app/
COPY --from=build /app ./ 
EXPOSE 3000 
CMD ["node","index.js"]