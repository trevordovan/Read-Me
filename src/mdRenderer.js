import fs from 'fs';
import { JSDOM } from 'jsdom'
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import hljs from 'highlight.js'

const md = markdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    }
}).use(markdownItAnchor, { permalink: false }); // allows navigating within the md file

export function getMdFileList(directory, callback) {
    // Check if the directory exists
    fs.access(directory, fs.constants.F_OK, (err) => {
        if (err) {
            // Directory does not exist or no permission to access
            callback(new Error('Data directory does not exist or cannot be accessed.'), null);
        } else {
            // Directory exists, proceed to read files
            fs.readdir(directory, (err, files) => {
                if (err) {
                    callback(err, null);
                } else {
                    const mdFiles = files.filter(file => file.endsWith('.md'));
                    callback(null, mdFiles);
                }
            });
        }
    });
};

export function mdToHtml(filePath, callback){
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Markdown Rendering Server</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
                    <link rel="stylesheet" type="text/css" href="/styles.css">
                    <link rel="stylesheet" type="text/css" href="/github.css">
                    <link rel="manifest" href="/manifest.json">
                </head>
                <body>
                    <a class="homeButton" href="/">Home</a>
                    <div class="mdContainer">
                        ${getHtmlFromMd(data)}
                    </div>
                </body>


                </html>
            `;
            callback(null, html);
        }
    });
};

function getHtmlFromMd(data) {
    let html = md.render(data);
    return styleCodeBlocks(html);
}

function styleCodeBlocks(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    document.querySelectorAll('pre code').forEach((block) => {
        // Copy button
        const button = document.createElement('button');
        button.className = 'copy-button';

        // Copy img
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 16 16');
        svg.setAttribute('version', '1.1');
        svg.setAttribute('width', '16');
        svg.setAttribute('class', 'octicon octicon-copy');

        // Add SVG paths
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z');
        svg.appendChild(path1);

        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z');
        svg.appendChild(path2);

        button.appendChild(svg);

        // Wrap block in a 'code-block' container
        const codeBlockContainer = document.createElement('div');
        codeBlockContainer.className = 'code-block';

        // Take the block out of its current parent (pre) and put it in the new container
        const parent = block.parentNode;
        parent.replaceChild(codeBlockContainer, block);
        codeBlockContainer.appendChild(block);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'copy-button-container';
        buttonContainer.appendChild(button);

        // Wrap code-block container and button container in a 'code-container' container
        const container = document.createElement('div');
        container.className = 'code-container';
        parent.insertBefore(container, codeBlockContainer);
        container.appendChild(codeBlockContainer);
        container.appendChild(buttonContainer);
 
        // Copy to clipboard functionality
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.innerText).then(() => {
                let temp = button.textContent;
                button.textContent = 'Copied. ✓';
                setTimeout(() => button.textContent = '', 2000);
                setTimeout(() => button.appendChild(svg), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    return dom.serialize();
}