#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git reset --hard origin/master && git clean -f -d
REACT_APP_SUB_URL=les-gauphres.wns.wilders.dev GATEWAY_PORT=$PORT docker-compose -f docker-compose-prod.yml up --build -d 
docker system prune -f