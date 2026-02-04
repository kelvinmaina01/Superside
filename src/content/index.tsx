import { createRoot } from 'react-dom/client';
import Overlay from './Overlay';
import '@/index.css'; // Import styles

console.log('SnapLearn AI Content Script Loaded');

// Create a container for the overlay
const container = document.createElement('div');
container.id = 'snap-learn-overlay-root';
document.body.appendChild(container);

const root = createRoot(container);
root.render(<Overlay />);
