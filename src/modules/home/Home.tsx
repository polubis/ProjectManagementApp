import React from 'react';
import { Helmet } from 'react-helmet';

import { Footer, Navbar } from 'shared/components';

import { Ecosystem, Features, Search, RecentTemplates } from './sections';

//
import { useAlertsProvider } from "shared/providers/alerts"
//

const Home = () => {
  //
  const { addAlert } = useAlertsProvider();
  //
  return (
    <>
      <Helmet>
        <title>Jupi.io - Simplified and faster project development process </title>
        <meta
          name="description"
          content="Use Jupi.io to boost your development process with high quality templates prepared by developers community from around the world!"
        />
      </Helmet>
      <Navbar />
      <button onClick={() => addAlert("Alert1")}>Alert1</button>
      <button onClick={() => addAlert("Alert2")}>Alert2</button>
      <Search />
      <Features />
      <RecentTemplates />
      <Ecosystem />
      <Footer />
    </>
  );
};

export default Home;
