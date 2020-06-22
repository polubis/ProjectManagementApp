import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Modules from 'modules';

import { Auth } from 'core/auth';
import TechnologiesProvider from 'core/technologies';

const App = () => {
  return (
    <BrowserRouter>
      <Auth.Provider>
        <TechnologiesProvider>
          <Modules />
        </TechnologiesProvider>
      </Auth.Provider>
    </BrowserRouter>
  );
};

export default App;
