#!/bin/bash

# fail function
fail() {
    echo Step $step returned $code
}

code=0
image='vitorfhc/irrifront'
tag='hml'
failed="code=$?; fail; exit $code"

[ $PROD ] && tag='prod'

echo Building $image:$tag

# build the application
step='build app'
docker-compose up -d webapp
hash=`docker ps --format "{{.ID}} {{.Image}}" |\
    grep webapp_webapp |\
    cut -f1 -d ' '`
#docker exec -it $hash quasar build || eval $failed

# build docker image
step='build image'
docker build -t "$image:$tag" -f Dockerfile.prod . || eval $failed

# publish image
docker push "$image:$tag" || eval $failed
