const DataEmpty = () => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error </title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="manifest" href="/manifest.json">
            <link rel="stylesheet" type="text/css" href="/styles.css">
        </head>
        <body>
            <div class='data-not-found'>
                <p>
                    Data directory is empty.
                </p>
            </div>
        </body>
        </html>
    `;
}

export default DataEmpty;