import React from 'react';

import { Footer, Navbar } from 'shared/components';

import { Ecosystem, Features, Search, RecommendedTemplates } from './sections';

const Home = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Features />
      <RecommendedTemplates />
      <Ecosystem />
      <Footer />
    </>
  );
};

export default Home;
