import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {

  // State
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");

  // Test the values
  useEffect(() => {
    console.log(`field 1: ${val}`);
  }, [val])

  useEffect(() => {
    console.log(`field 2: ${val2}`);
  }, [val2])

  return (
    <>
      <label>Favorite Phrase:
        <input 
          value={val}
          onChange={e => setVal(e.target.value)}
        />
      </label>
      <br />
      <label>
        Second Favorite Phrase:
        <input 
          value={val2}
          onChange={e => setVal2(e.target.value)} 
        />
      </label>
    </>
  )
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
