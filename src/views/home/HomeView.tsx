import React from 'react';

import { Topbar, BasicInformation, TilesSection, RecommendedTemplates, HomeDescription, Footer } from '.';

const HomeView = () => {
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

export default HomeView;
