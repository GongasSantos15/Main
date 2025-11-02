import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Understanding Props in a Component
function Hello({ library, message, number }) {
  return (
    <div>
      <h1>Welcome to {library}!</h1>
      <p>{message}</p>
      <p>{number} Props Total</p>
    </div>
  );
}

root.render(
  <Hello
    library = "React"
    message = "Add dynamic data!"
    number = {3}
  />
);
