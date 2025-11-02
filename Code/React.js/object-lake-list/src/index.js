import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Lakes Object
const lakeList = [
  { id: 1, name: "Echo", trailhead: "Echo" },
  { id: 2, name: "Maud", trailhead: "Wrights" },
  { id: 3, name: "Velma", trailhead: "Bayview" },
];

// App Function
function App({ lakes }) {
  return (
    <div>
      {lakes.map(lake => (
        <div>
          <h2>{lake.name}</h2>
          <p>Accessed by: {lake.trailhead}</p>
        </div>
      ))}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App lakes={lakeList} />
);

