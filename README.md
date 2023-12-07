# Markdown Rendering Server

## Overview
This web application serves as a Markdown renderer. It reads a Markdown files (like README.md), converts them to HTML using `markdown-it`, and serves through an Express.js server. There is also additional JavaScript functionality to enhance the rendered Markdown, such as adding copy buttons to code blocks.

### Default Port
The default port is `8083`. To change this modify `port` in `/config.js`.

### CORS
This webserver also provides Cross-origin resource sharing (CORS). To enable see `corsOptions` in `/config.js`.

## Requirements
- Node.js
- npm (Node Package Manager)

## Installation
Clone the repository to your local machine using `git clone [repository-url]`, or download the ZIP file and extract it.

## Install Dependencies
Navigate to the root directory.  
  
Run `npm install` to install the necessary Node.js modules.

## Usage
Place `.md` files in the data directoy.  
  
Navigate to the src directory and run  
```
node app.js
```

### Docker
Navigate to the root directoy and run  
```
docker-compose up -d
```
