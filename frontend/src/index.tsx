import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import App from './App';

import 'styles/index.scss';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

WebFont.load({
  google: {
    families: ['Montserrat:300,400,500,700', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
