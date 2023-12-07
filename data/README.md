# Home Server

### Specs

#### Basic Info:
- **name**: home-server                 
- **description**: Desktop Computer
- **product**: Inspiron 530
- **vendor**: Dell Inc.
- **version**: OEM
- **serial**: J4V40F1

#### Motherboard:
- **product**: 0RY007
- **vendor**: Dell Inc.
- **physical id**: 0
- **serial**: ..CN73604793082O.

#### CPU:
- **product**: Intel(R) Core(TM)2 Duo CPU E4500 @ 2.20GHz
- **version**: 6.15.13
- **slot**: Socket 775
- **size**: 1221MHz
- **capacity**: 4GHz
- **width**: 64 bits
- **clock**: 200MHz
- **configuration**: cores=2 enabledcores=2 microcode=164 threads=2

#### Memory:
(2x)
- **description**: DIMM DDR2 Synchronous 667 MHz (1.5 ns)
- **product**: HYMP512U64CP8-Y5
- **vendor**: Hynix Semiconductor (Hyundai Electronics)
- **physical** id: 0
- **serial**: 00007294
- **slot**: DIMM1
- **size**: 1GiB
- **width**: 64 bits
- **clock**: 667MHz (1.5ns)

### Operating System:
Ubuntu Server 22.04.03 LTS

# Services

## Docker

**To list currently running containers**:
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

## Homer
A home server dashboard.  
Runs in a docker container. Setup using docker-compose.

**Docker**:
see `docker/homer/docker-compose.yaml`

**For Dashboard Modification see**:
- `docker/homer/data/config.yml`
- `docker/homer/data/custom.css`
  
**Ports**
- http: `8080:8080`

## Nextcloud
File-hosting server.

**Ports**
- http: `8081`

# Media

## Plex
Self Hosted Media Streaming.

**Ports**
- http: `32400:32400`

**Installation**:  
Refer to: https://support.plex.tv/articles/200288586-installation/
```
wget https://downloads.plex.tv/plex-media-server-new/1.19.3.2852-219a9974e/debian/plexmediaserver_1.19.3.2852-219a9974e_amd64.deb 
```
```
sudo dpkg -i plexmediaserver_1.19.3.2852-219a9974e_amd64.deb
```
*note remember to change the version number to corresponded to the .deb you donwload.*

**Enabling**:  
```
sudo systemctl enable plexmediaserver.service
```
**Starting **:
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

# VPN

## Mullvad
This server runs mullvad vpn.  

**Installation**:  
Refer to: https://mullvad.net/en/help/install-mullvad-app-linux  
```
sudo curl -fsSLo /usr/share/keyrings/mullvad-keyring.asc https://repository.mullvad.net/deb/mullvad-keyring.asc

echo "deb [signed-by=/usr/share/keyrings/mullvad-keyring.asc arch=$( dpkg --print-architecture )] https://repository.mullvad.net/deb/stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/mullvad.list

sudo apt update
sudo apt install mullvad-vpn
```

**Usage**:  
Refer to: https://mullvad.net/en/help/how-use-mullvad-cli  

mullvad --help

**Check Status**
```
mullvad status
```
**Login**:
```
mullvad account login <account_number>
mullvad account login 1234123412341234
```
**Location**:
```
mullvad relay set location <country> <city>  
mullvad relay set location us
```
**Connect**:
Connect to the location that you selected.
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

# Example.

user@home-server:~$ ps aux | grep plex
plex      695846  2.3  2.0 156396 40400 ?        Ssl  18:49   6:01 /usr/lib/plexmediaserver/Plex Media Server
user@home-server:~$ mullvad split-tunnel add 695846 
Excluding process
```


