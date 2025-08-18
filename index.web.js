import React from 'react';
import { createRoot } from 'react-dom/client';
import TestApp from './TestApp';

// Standard React DOM mounting
const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<TestApp />);
