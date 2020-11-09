import React, { lazy, Suspense } from 'react';

export const withLazy = Component => {
  const LazyComponent = lazy(Component);

  const SuspendedComponent = props => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );

  SuspendedComponent.preload = Component;

  return SuspendedComponent;
};
