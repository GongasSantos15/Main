import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// First Element Created
// root.render(React.createElement("h1", { style: {color: "blue" } }, "Hello!"));

// It is also possible to create a children element inside a parent one
root.render(React.createElement(
	"div", 
	{ style: { color: "blue" } },
	React.createElement("h1", null, "hi!")
));