import React, { lazy, Suspense } from 'react';

export const withLazy = Component => {
  const LazyComponent = lazy(Component);

  const SuspenedComponent = props => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );

  SuspenedComponent.preload = Component;

  return SuspenedComponent;
};
