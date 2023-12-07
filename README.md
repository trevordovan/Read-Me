# Markdown Renderer Server

## Overview
This web application serves as a Markdown renderer. It reads a Markdown file (like README.md), converts it to HTML using `markdown-it`, and serves it through an Express.js server. It also includes an additional JavaScript functionality to enhance the rendered Markdown, such as adding copy buttons to code blocks.

## Requirements
- Node.js
- npm (Node Package Manager)

## Installation
Clone the Repository  

Clone the repository to your local machine using `git clone [repository-url]`, or download the ZIP file and extract it.

## Install Dependencies
Navigate to the project directory in your terminal.
Run `npm install` to install the necessary Node.js modules.

## Usage
Place a file: `README.md` in the data directoy.  
  
Navigate to the src directory and run 
```
node app.js
```

### Docker
Navigate to the root directoy and run
```
docker-compose up -d
```
