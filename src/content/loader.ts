(async () => {
    // 1. REGISTER LISTENER IMMEDIATELY (Before any async imports)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('[Superside] Loader received message:', message);

        if (message.type === 'PING') {
            sendResponse({ status: 'pong' });
            return true;
        }

        if (message.type === 'SHOW_OVERLAY') {
            // Forward to the webpage where the content script (Overlay) will hear it
            window.dispatchEvent(new CustomEvent('snaplearn:show-overlay'));
            sendResponse({ success: true, status: 'overlay_triggered_via_loader' });
            return true;
        }

        if (message.type === 'HIDE_OVERLAY') {
            window.dispatchEvent(new CustomEvent('snaplearn:hide-overlay'));
            sendResponse({ success: true, status: 'overlay_hidden_via_loader' });
            return true;
        }

        return false;
    });

    const src = chrome.runtime.getURL('content.js');
    console.log('[Superside] Dynamic loader starting:', src);
    try {
        await import(src);
        console.log('[Superside] Dynamic loader success');
    } catch (e) {
        console.error('[Superside] Dynamic loader failed:', e);
    }
})();
