import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Create my first React component
function Hello() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>Let's build something cool.</p>
    </div>
  );
}

root.render(<Hello />)