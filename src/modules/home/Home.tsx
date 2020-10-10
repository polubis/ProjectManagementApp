import React from 'react';

import { Footer, Navbar } from 'shared/components';

import { Ecosystem, Features, Search, RecentTemplates } from './sections';

const Home = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Features />
      <RecentTemplates />
      <Ecosystem />
      <Footer />
    </>
  );
};

export default Home;
