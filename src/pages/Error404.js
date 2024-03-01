const Error404 = () => {
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
                    Whoops. That doesn't Exist :(
                </p>
            </div>
        </body>
        </html>
    `;
}

export default Error404;