import React from 'react';

import { Topbar, BasicInformation, TilesSection, RecommendedTemplates, HomeDescription, Footer } from '.';

const HomeView = () => {
  return (
    <>
      <Topbar />
      <BasicInformation />
      <TilesSection />
      <RecommendedTemplates />
      <HomeDescription />
      <Footer />
    </>
  );
};

export default HomeView;
