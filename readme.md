## How to Build 

### Normal Build
- Build Docker Image: `docker build -t certificate-worker .`
- Run a Container from the image: `docker run -t -d --env-file .env certificate-worker`
- sh into the container: `docker exec -it <container-id>  /bin/sh`

### Local Development Build
- Build Docker Image: `docker build -t certificate-worker .`
- Run a Container from the image: `docker run -t -d --env-file .env certificate-worker`
- sh into the container: `docker run -it --entrypoint /bin/bash certificate-worker -s`
