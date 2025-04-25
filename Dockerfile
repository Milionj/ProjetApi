FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
# // backend-1 : Va attendre que db:5432 réponde
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh
CMD ["./wait-for-db.sh"]

