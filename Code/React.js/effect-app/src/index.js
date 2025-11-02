import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// Checkbox Component
function Checkbox() {

  // State
  const [checked, setChecked] = useState(false);
  
  // Effect
  useEffect(() => {
      alert(`checked: ${checked.toString()}`)
  })

  return (
    <>
      <input 
        type="checkbox" 
        value={checked} 
        onChange={() => setChecked(checked => !checked)} />
      {checked ? "checked" : "not checked"}
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Checkbox />
);

