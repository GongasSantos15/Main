import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Lakes Object
const lakeList = [
  { id: 1, name: "Echo", trailhead: "Echo" },
  { id: 2, name: "Maud", trailhead: "Wrights" },
  { id: 3, name: "Velma", trailhead: "Bayview" },
];

// List of Numbers
const items = [1, 2, 3, 4, 5];

// App Function
function App({ lakes }) {
  return (
    <>
      {/* Lakes List */}
      <div>
        {lakes.map(lake => (
          <div key={lake.id}>
            <h2>{lake.name}</h2>
            <p>Accessed by: {lake.trailhead}</p>
          </div>
        ))}
      </div>

      {/* Items List */}
      <div>
        <ul>
          {items.map(item => (
            <li key={item.toString()}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App lakes={lakeList} />
);

