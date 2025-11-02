import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Function to Fetch Data
function GitHubUser({ login }) {
  
  // State
  const [data, setData] = useState(null);

  // Effect
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (data) {
    return (
      <div>
        <h1>{data.login}</h1>
        <img src={data.avatar_url} width={100} />
      </div>
    )
  }
  return null;
}

function App() {
  return <GitHubUser login="moonhighway" />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
