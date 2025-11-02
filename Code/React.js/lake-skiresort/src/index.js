import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Function that shows the Lake
function Lake({ name }) {
  return (
    <div>
      <h1>Visit {name}!</h1>
    </div>
  );
}

// Function that shows the Ski Resort
function SkiResort({ name }) {
  return (
    <div>
      <h1>Visit {name}!</h1>
    </div>
  );
}

// App Function
function App(props) {
  return (
    <div>
      {props.season === "summer" ? (
        <Lake name="Jenny Lake" />
      ) : props.season === "winter" ? (
        <SkiResort name="JHMR" />
      ) : (
        <h1>Come back in the winter or summer!</h1>
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App season="fall" />
);
