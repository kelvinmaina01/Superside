// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
    console.log('SnapLearn AI Extension Installed');
});

// Listen for messages from content script or popup
// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CAPTURE_SCREENSHOT') {
        // Handle global capture logic
        console.log('Capture request received');
    }

    if (message.type === 'CAPTURE_AREA') {
        const { area, devicePixelRatio } = message;

        chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
            if (chrome.runtime.lastError || !dataUrl) {
                console.error("Failed to capture tab:", chrome.runtime.lastError);
                sendResponse({ error: 'Capture failed' });
                return;
            }
            sendResponse({ dataUrl }); // Return full image to content script for cropping
        });
        return true; // Async response
    }
});
