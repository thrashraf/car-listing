#!/bin/bash

echo "Pulling from main"
git pull

echo "Building application"
docker-compose -f docker-compose.prod.yml up -d
