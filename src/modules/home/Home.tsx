import React from 'react';

import { Topbar, BasicInformation, TilesSection, RecommendedTemplates, HomeDescription, Footer } from '.';

const Home = () => {
  return (
    <div>
      <Topbar />
      <BasicInformation />
      <TilesSection />
      <RecommendedTemplates />
      <HomeDescription />
      <Footer />
    </div>
  );
};

export default Home;
