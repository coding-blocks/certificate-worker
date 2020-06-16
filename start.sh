#!/bin/bash

yarn static & /bin/wait-for-it.sh $host:$port -- yarn start
