import React from 'react';

import { Topbar, BasicInformation, TilesSection, RecommendedTemplates } from '.';

const HomeView = () => {
  return (
    <div>
      <Topbar />
      <BasicInformation />
      <TilesSection />
      <RecommendedTemplates />
    </div>
  );
};

export default HomeView;
