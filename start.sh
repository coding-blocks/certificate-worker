#!/bin/bash

yarn frontend:build
nginx
yarn start
