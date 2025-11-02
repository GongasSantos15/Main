import { React, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// App Function
function App() {
  // Create state
  const [status, setStatus] = useState("Open");

  return (
    <div>
      <h1>Status: {status}</h1>
      <button onClick={() => setStatus("Open")}>Open</button>
      <button onClick={() => setStatus("Back in 5")}>Break</button>
      <button onClick={() => setStatus("Closed")}>Close</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


