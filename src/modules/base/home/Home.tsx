import React from 'react';
import { Helmet } from 'react-helmet';

import { Ecosystem, Features, Search, RecentTemplates } from './sections';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Jupi.io - Simplified and faster project development process </title>
        <meta
          name="description"
          content="Use Jupi.io to boost your development process with high quality templates prepared by developers community from around the world!"
        />
      </Helmet>
      <Search />
      <Features />
      <RecentTemplates />
      <Ecosystem />
    </>
  );
};

export default Home;
