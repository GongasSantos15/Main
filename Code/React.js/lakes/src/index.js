import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

function Lake({ name }) {
  return <h1>{name}</h1>
}

// Using the same component but with 3 different values
function App() {
  return (
    <div>
      <Lake name="Lake Tahoe" />
      <Lake name="Angora Lake" />
      <Lake name="Shirley Lake" />
    </div>
  );
}

root.render(<App/>);