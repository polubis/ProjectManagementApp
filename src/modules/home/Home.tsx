import React from 'react';

import { Footer, Navbar } from 'shared/components';

import { Ecosystem, Features, Search, TopTemplates } from './sections';

const Home = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Features />
      <TopTemplates />
      <Ecosystem />
      <Footer />
    </>
  );
};

export default Home;
