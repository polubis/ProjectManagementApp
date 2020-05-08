import React from 'react';

import { Topbar, BasicInformation, TilesSection, RecommendedTemplates, HomeDescription } from '.';

const HomeView = () => {
  return (
    <div>
      <Topbar />
      <BasicInformation />
      <TilesSection />
      <RecommendedTemplates />
      <HomeDescription />
    </div>
  );
};

export default HomeView;
