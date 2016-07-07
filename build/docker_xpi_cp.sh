#!/bin/bash

# Build the image with a unique name to the second
# (See Dockerfile)
# Run it and copy the built xpi locally to host
# Cleanup after.
# TODO: dynamically get built xpi

MYID=`/bin/date +'%Y%m%d-%H%M%S'`
docker build -t ${MYID} .
JOB=`docker run -d ${MYID}`
docker cp ${JOB}:/usr/src/app/@mlbtvlinks-4-yahoofantasy-0.0.3.xpi ./
docker kill ${JOB} 
docker stop ${JOB} 
docker rm ${JOB}
docker rmi ${MYID}
