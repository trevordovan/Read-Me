# Read Me: A Markdown Rendering Server

## Overview
This web application serves as a Markdown renderer. It reads Markdown files (like README.md), converts them to HTML using `markdown-it`, and serves through an express.js server. There is also additional JavaScript functionality to enhance the rendered Markdown, such as adding copy buttons to code blocks.

### Default Port
The default port is `8083`. To change this modify `port` in `/config.js`.

### CORS
This webserver provides support for Cross-origin resource sharing (CORS). To enable see `corsOptions` in `/config.js`.

## Requirements
- Node.js
- npm (Node Package Manager)

## Installation
Clone the repository to your local machine using `git clone [repository-url]`, or download the ZIP file and extract it.

## Install Dependencies
Navigate to the root directory.  
  
Run `npm install` to install the necessary Node.js modules.

## Usage
Place `.md` files in the `/data` directoy.  
  
Navigate to the root directory and run  
```
npm run start
```
  
For development run
```
npm run dev
```

## Running within Local Area Network
To run the development server within a local area network modify the dev script in `package.json` to use `--listen`.  
  
This will allow computers on the local network to access the webserver, and also computers on the internet if port forwarding is configured.  
Example address: `http://192.168.1.5:8083` Where your "192.168.1.5" is the local IP address.

### Docker
Navigate to the root directoy and run  
```
docker-compose up -d
```
