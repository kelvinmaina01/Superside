import { createRoot } from 'react-dom/client';
import Overlay from './Overlay';
import '@/index.css';
import { hostname } from 'os';

console.log('[Superside] Content Script Initializing...');

// ISOLATE WITH SHADOW DOM
// This prevents host page scripts/React from interfering with our UI
const hostId = 'superside-ai-host';
let host = document.getElementById(hostId);


if (!host) {
    host = document.createElement('div');
    host.id = hostId;
    document.body.appendChild(host);
}

const shadowRoot = host.shadowRoot || host.attachShadow({ mode: 'open' });

// Container for React inside Shadow DOM
let container = shadowRoot.querySelector('#snap-learn-overlay-root') as HTMLDivElement;
if (!container) {
    container = document.createElement('div');
    container.id = 'snap-learn-overlay-root';
    container.style.display = 'none';
    shadowRoot.appendChild(container);

    // Inject CSS into Shadow DOM
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('assets/index.css');
    shadowRoot.appendChild(link);

    // Inject Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    shadowRoot.appendChild(fontLink);
}

// REGISTER LISTENER for content logic
window.addEventListener('snaplearn:hide-overlay', () => {
    if (container) container.style.display = 'none';
});

window.addEventListener('snaplearn:show-overlay', () => {
    if (container) container.style.display = 'block';
});

const root = createRoot(container);
root.render(<Overlay />);

console.log('[Superside] Content Script Ready');
