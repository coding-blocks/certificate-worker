## Certificate Worker
This service is used to generate a certificate-pdf for given student data. It works on amqp protocol on rabbitmq-server and uses amoeba-certificate as consumer.

## Setup
This project can be setup locally as well as on docker.

## Setup locally
* Firstly download and install rabbitmq-server on your system. [See here](https://www.rabbitmq.com/download.html)
* Create .env
* Make sure rabbitmq-server is running (default port 5672)
* Start server.
  ```
  npm start
  ```
* For testing.
   ```
  npm test
  ```

## Setup on docker
* Create .env
* Run all services on docker
  ```
  docker-compose up
  ```
