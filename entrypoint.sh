#!/usr/bin/env sh

#checking database
echo "Waiting connection to database..."
while ! nc -z v_db 5432; do
  sleep 0.1
done
echo "Database has been started"

echo "npm install..."
npm install

echo "building server..."
npm run build

echo "applying seeds..."
npm run seed:run

echo "Starting server..."
npm start
