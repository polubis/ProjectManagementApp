import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import App from './App';

import 'styles/index.scss';

WebFont.load({
  google: {
    families: ['sans-serif', 'Montserrat:300,400,500,700&display=swap']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
