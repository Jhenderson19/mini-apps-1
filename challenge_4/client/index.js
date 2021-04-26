import React from 'react';
import reactDom from 'react-dom';
import App from './components/app.jsx'

console.log('index js');

reactDom.render(<App />, document.getElementById('app'));