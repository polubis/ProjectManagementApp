import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Modules from 'modules';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Modules />
    </BrowserRouter>
  );
};

export default App;
