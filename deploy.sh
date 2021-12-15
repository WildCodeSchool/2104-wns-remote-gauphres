#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git reset --hard origin/dev && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose-prod.yml up --build -d
docker system prune -f