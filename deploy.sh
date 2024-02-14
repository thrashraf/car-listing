#!/bin/bash

echo "Pulling from main"
git pull

echo "Building application"
docker compose up --build -d