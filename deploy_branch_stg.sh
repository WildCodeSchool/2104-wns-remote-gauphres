#!/bin/sh
echo "PORT=$PORT"
echo "SUB=$SUB"
git fetch origin && git reset --hard origin/dev && git clean -f -d
REACT_APP_SUB_URL=$SUB GATEWAY_PORT=$PORT docker-compose -f docker-compose-prod.yml up --build -d 
docker system prune -f