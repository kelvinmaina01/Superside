import { createRoot } from 'react-dom/client';
import Overlay from './Overlay';
import '@/index.css';

console.log('Superside Content Script Loaded');

// Create a container for the overlay (but don't show it yet)
const container = document.createElement('div');
container.id = 'snap-learn-overlay-root';
container.style.display = 'none'; // Hidden by default
document.body.appendChild(container);

const root = createRoot(container);
root.render(<Overlay />);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Content script received message:', message);

    if (message.type === 'SHOW_OVERLAY') {
        console.log('Showing overlay...');
        container.style.display = 'block';

        // Dispatch a custom event to tell the Overlay component to show
        window.dispatchEvent(new CustomEvent('snaplearn:show-overlay'));

        sendResponse({ success: true });
        return true; // Keep message channel open for async response
    }

    if (message.type === 'HIDE_OVERLAY') {
        console.log('Hiding overlay...');
        container.style.display = 'none';
        sendResponse({ success: true });
        return true;
    }

    return false;
});

// Log that we're ready to receive messages
console.log('Content script ready and listening for messages');
