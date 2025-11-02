import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Lakes List
const lakeList = [
  "Echo Lake",
  "Maud Lake",
  "Cascade Lake"
];

// App Function
function App({ lakes }) {
  return (
    <ul>
      {lakes.map(lake => (
        <li>{lake}</li>
      ))}
    </ul>
  );
}

// Show the Content
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App lakes={lakeList} />
);
