## System Requirements

* Ubuntu 22.04 EC2 instance
* [Docker Engine](https://docs.docker.com/engine/install/ubuntu/)
* [Node v16.18](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
* Optional [NVM](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)
* [Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04) for reverse proxy


## Setup
Connect to the EC2 instance (it should look like ubuntu22-sutd-student-6) either via SSH or using the AWS console directly

Clone this repo into a fresh Ubuntu 22.04 EC2 instance

run 
``` 
cd adopt-me-backend
```

run
```
docker build -t adopt-me-backend .
```
to build a new container image
and all relevant dependencies will be installed automatically in the container environment


Start your container using by running the command
`docker run -dp 3001:3001 adopt-me-backend`

## Viola!
To test that your backend application is up and running, visit http://student-6.sutdacademytools.net:3001/pets/list
and you would view the initial json file data loaded
