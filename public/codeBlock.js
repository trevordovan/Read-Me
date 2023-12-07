window.onload = function() {
    document.querySelectorAll('pre code').forEach((block) => {
        // Create a button element
        const button = document.createElement('button');
        button.className = 'copy-button';

        // Create SVG element
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

        // Append SVG to button
        button.appendChild(svg);

        // Wrap code block and button in a container
        const container = document.createElement('div');
        container.className = 'code-container';
        block.parentNode.insertBefore(container, block);
        container.appendChild(block);
        container.appendChild(button);

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
};