import React from 'react';

import Navbar from './navbar';
import Footer from './footer';
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
