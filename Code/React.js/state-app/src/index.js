import { React, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// App Function
function App() {
  // Create states
  const [status, setStatus] = useState("Open");
  const [manager, setManager] = useState("Alex");
  const [year, setYear] = useState(2050);

  return (
    <>
      {/* Year */}
      <div>
        <h1>{year}</h1>
        <button onClick={() => setYear(year + 1)}>New Year</button>
      </div>

      {/* Managers */}
      <div>
        <h1>Manager on Duty: {manager}</h1>
        <button onClick={() => setManager("Rachel")}>New Manager</button>
      </div>

      {/* Status */}
      <div>
        <h1>Status: {status}</h1>
        <button onClick={() => setStatus("Open")}>Open</button>
        <button onClick={() => setStatus("Back in 5")}>Break</button>
        <button onClick={() => setStatus("Closed")}>Close</button>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


