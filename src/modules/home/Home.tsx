import React from 'react';

import Navbar from '../../shared/components/navbar';
import Footer from '../../shared/components/footer';
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
