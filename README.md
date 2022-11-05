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

## Possible Vulnerabilities 
This application does not have HTTPS implemented. Without HTTPS, the data passed is insecure and it makes it easy for attackers to launch exploits over websites. HTTPS can help to secure connection by encrypting data. Confidential information on my site might be accessed by hackers. This may lead to leakage of data of the website, including other sensitive information which may be compromised. Hence without HTTPS, the users might have a lack of trust in using the website. To mitigate this, we can use [certbot](https://certbot.eff.org/instructions?ws=nginx&os=ubuntuxenial) to generate a certificate and turning on HTTPS access in a single command line 

This application does not have a web application firewall. A web application firewall (WAF) can filter, monitor and block malicious traffics to the application. Without the WAF, there could be possible cross-site-scripting attacks. One way to mitigate this is to install the [nginx ModSecurity WAF](https://docs.nginx.com/nginx-waf/admin-guide/nginx-plus-modsecurity-waf-installation-logging/), which include features that allow for the automatic blocking of traffic from known malicious IP addresses to the website. We can customise our own rule engines to block certain requests as well.
