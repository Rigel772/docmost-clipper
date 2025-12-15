// src/content.js
console.log('Docmost Clipper Content Script Loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'get-content') {
        try {
            // Use Readability to parse the document
            const documentClone = document.cloneNode(true);
            // Check for user selection
            let selectionHtml = '';
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
                const container = document.createElement('div');
                for (let i = 0; i < selection.rangeCount; i++) {
                    container.appendChild(selection.getRangeAt(i).cloneContents());
                }
                selectionHtml = container.innerHTML;
            }

            const article = new Readability(documentClone).parse();

            if (article || selectionHtml) { // Success if either article or selection exists
                sendResponse({
                    success: true,
                    data: {
                        title: article ? (article.title || document.title) : document.title,
                        content: article ? article.content : '',
                        textContent: article ? article.textContent : '',
                        excerpt: article ? article.excerpt : '',
                        selection: selectionHtml,
                        url: window.location.href
                    }
                });
            } else {
                sendResponse({ success: false, error: 'Could not parse page content' });
            }
        } catch (error) {
            console.error('Docmost Clipper: Error parsing page', error);
            sendResponse({ success: false, error: error.message });
        }
        return true; // Keep channel open for async response
    }
});
