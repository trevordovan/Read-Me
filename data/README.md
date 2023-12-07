# Home Server

This documentation provides clear instructions and necessary commands for the effective operation and maintenance of various services running on Ubuntu Server 22.04.03 LTS. The server hosts a range of applications, from media streaming to secure VPN services, making it an integral part of your digital home infrastructure.

## Overview

This server runs multiple services:
- [**Homer Dashboard**](#homer-dashboard): A centralized dashboard for easy access to all server services.  
- [**Nextcloud**](#nextcloud): A personal cloud storage solution.  
- [**Plex Media Server**](#plex-media-server): For streaming and organizing media content.  
- [**Self-Hosted Readme**](#self-hosted-readme): A custom service used for viewing Markdown documents (server readme) locally.  
- [**Mullvad VPN**](#vpn): Ensures secure and private internet access.  
  
Several of the server's operations are streamlined using [Docker and Docker Compose](#containerization-with-docker), ensuring consistent environments and simplifying deployment processes.

# Specs

### Basic Info:
- **name**: home-server               
- **description**: Desktop Computer  
- **product**: Inspiron 530  
- **vendor**: Dell Inc.  
- **version**: OEM  
- **serial**: J4V40F1  

### Motherboard:
- **product**: 0RY007  
- **vendor**: Dell Inc.  
- **physical id**: 0  
- **serial**: ..CN73604793082O.  

### CPU:
- **product**: Intel(R) Core(TM)2 Duo CPU E4500 @ 2.20GHz  
- **version**: 6.15.13  
- **slot**: Socket 775  
- **size**: 1221MHz  
- **capacity**: 4GHz  
- **width**: 64 bits  
- **clock**: 200MHz  
- **configuration**: cores=2 enabledcores=2 microcode=164 threads=2  

### Memory:
(2x)  
- **description**: DIMM DDR2 Synchronous 667 MHz (1.5 ns)  
- **product**: HYMP512U64CP8-Y5  
- **vendor**: Hynix Semiconductor (Hyundai Electronics)  
- **physical** id: 0  
- **serial**: 00007294  
- **slot**: DIMM1  
- **size**: 1GiB (**total**: 2Gib)  
- **width**: 64 bits  
- **clock**: 667MHz (1.5ns)  

### Operating System:
- Ubuntu Server 22.04.03 LTS  

# Containerization with Docker
Docker is used for deploying and managing several of the applications listed above in a consistent and isolated environment. It simplifies the process of running these services and ensures they operate smoothly regardless of external changes in the server environment.

## Key Docker Commands

**List currently running containers**:
```
docker ps
```
**List all docker containers (running and stopped)**:
```
docker ps --all
```
**View resource usage stats**:
```
docker container stats
```
**Shutdown Container**:
```
docker stop [CONTAINER_ID_OR_NAME]
```

## Using Docker Compose
Docker Compose is used for defining and running multi-container Docker applications. For example, [Homer Dashboard](#homer-dashboard) and the [Markdown Renderer](#self-hosted-markdown-renderer) are set up and managed using Docker Compose.

**To run docker-compose.yaml files**:
```
docker-compose up -d
```

# Services

## Homer Dashboard
A home server dashboard that runs in a docker container using docker-compose.

### Ports
- http: `8080:8080`

### Usage
**Starting Server**:
```
cd /docker/homer
docker-compose up -d
```
**Stopping Server**:
```
docker stop [CONTAINER_ID_OR_NAME]
```

### For Dashboard Modification see:
- `docker/homer/data/config.yml`
- `docker/homer/data/custom.css`

## Nextcloud
File-hosting server. Runs via snap.

### Ports
- http: `8081`

### Usage
**Use snap to ensure Nextcloud is installed**:
```
snap list
```
**Starting Server**: 
```
snap start nextcloud
```

**Stopping Server**:
```
snap stop nextcloud
```

# Media

## Plex Media Server
Self Hosted Media Streaming.

### Ports
- http: `32400:32400`

### Installation
Refer to: https://support.plex.tv/articles/200288586-installation/
```
wget https://downloads.plex.tv/plex-media-server-new/1.19.3.2852-219a9974e/debian/plexmediaserver_1.19.3.2852-219a9974e_amd64.deb 
```
```
sudo dpkg -i plexmediaserver_1.19.3.2852-219a9974e_amd64.deb
```
*note remember to change the version number to corresponded to the .deb downloaded.*

### Usage
**Enabling Plex Media Server**:  
```
sudo systemctl enable plexmediaserver.service
```
**Starting Server**:  
```
sudo systemctl start plexmediaserver.service
```
**Verify the status of service**:
```
sudo systemctl status plexmediaserver.service
```
**Updating**:
```
echo deb https://downloads.plex.tv/repo/deb public main | sudo tee /etc/apt/sources.list.d/plexmediaserver.list
curl https://downloads.plex.tv/plex-keys/PlexSign.key | sudo apt-key add -

sudo apt-get update
sudo apt-get upgrade
```

## Self Hosted Readme
A custom written javascript service for rendering Markdown files, hosted in a docker container. Designed to run locally on a home server. It provides an easy and accessible way to view Markdown-formatted documents through a web browser. Used for displaying the readme for this homer server.

### Ports
- http: `8083:8083`

### How It Works  
- **Markdown Rendering**: Utilizes markdown-it, a Markdown parser in Node.js, to convert Markdown files into HTML for web viewing.
- **Local Web Server**: Runs an Express.js server in Node.js, serving the rendered Markdown content over HTTP.
- **Dockerized Environment**: The entire application is containerized using Docker, ensuring consistent environments and easy deployment.

### Usage
**Starting Server**:
```
cd docker/readme
docker-compose up -d
```
**Stopping Server**:
```
docker stop [CONTAINER_ID_OR_NAME]
```

### Modifications
If modifications are made to server.js or any other configuration files after building the Docker image, make sure to rebuild the image and restart the container:
```
docker-compose down
docker-compose up --build -d
```

# VPN

## Mullvad
This server runs mullvad vpn.  

**Installation**:  
Refer to: https://mullvad.net/en/help/install-mullvad-app-linux  
```
sudo curl -fsSLo /usr/share/keyrings/mullvad-keyring.asc https://repository.mullvad.net/deb/mullvad-keyring.asc

echo "deb [signed-by=/usr/share/keyrings/mullvad-keyring.asc arch=$( dpkg --print-architecture )]  
https://repository.mullvad.net/deb/stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/mullvad.list

sudo apt update
sudo apt install mullvad-vpn
```

**Usage**:  
Refer to: https://mullvad.net/en/help/how-use-mullvad-cli

**Check Status**
```
mullvad status
```
**Login**:
```
mullvad account login <account_number>
```
**Location**:
```
mullvad relay set location <country> <city>  
```
**Connection**:
*Connects to the selected location.*
```
mullvad connect
mullvad disconnect
```
**Auto Connect**:
```
mullvad auto-connect set on
mullvad auto-connect set off
```
**Enable LAN access**:
```
mullvad lan set allow
mullvad lan set block
```
**Lockdown Mode**:
```
mullvad lockdown-mode set on
mullvad lockdown-mode set off
```
**Split Tunneling**: *Should Plex be split-tunneled?*
```
mullvad split-tunnel add <pid>
mullvad split-tunnel list
mullvad split-tunnel delete <pid>
```
```
# Example:

user@home-server:~$ ps aux | grep plex
plex      695846  2.3  2.0 156396 40400 ?        Ssl  18:49   6:01 /usr/lib/plexmediaserver/Plex Media Server
user@home-server:~$ mullvad split-tunnel add 695846 
Excluding process
```



