#!/bin/sh
docker build -t fe_interview .
docker run -t --name fe_interview -p 8000:8000 fe_interview
