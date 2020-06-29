#!/bin/bash

/bin/wait-for-it.sh $host:$port -- yarn start
