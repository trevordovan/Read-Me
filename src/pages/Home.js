const Home = (files) => {
    const fileListItems = files.map(file => {
        const fileNameWithoutExtension = file.replace(/\.md$/, ''); // Replace '.md' at the end of the string with an empty string
        return `
            <li class="md-file-item">
                <a href="/file/${file}">${fileNameWithoutExtension}</a>
            </li>
        `;
    }).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Markdown Rendering Server</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
            <link rel="stylesheet" type="text/css" href="/styles.css">
            <link rel="manifest" href="/manifest.json">
        </head>
        <body>
            <div class="list-page">
                <h1>Markdown Rendering Server</h1>
                <div class="md-file-list-container">
                    <ul class="md-file-list">${fileListItems}</ul>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default Home;