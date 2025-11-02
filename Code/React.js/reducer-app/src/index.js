import { React, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Checkbox() {
  const [checked, toggle] = useReducer(checked => !checked, false);

  return (
    <>
      <input 
        type="checkbox"
        value={checked}
        onChange={toggle}
      />
      {checked ? "checked" : "not checked"}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Checkbox />
);
