FROM node:18-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update apk add --no-cache postgresql postgresql-client
WORKDIR /server
COPY package*.json ./
EXPOSE 5000
ENV NODE_ENV development
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
# Добавление entrypoint скрипта
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY . .
# Установка скрипта в качестве точки входа
ENTRYPOINT ["/entrypoint.sh"]
