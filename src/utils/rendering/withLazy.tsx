import React, { lazy, Suspense } from 'react';

export const withLazy = (
  factory: () => Promise<{ default: React.ComponentType<any> }>,
  Fallback: React.ComponentType = () => null
) => {
  const LazyComponent = lazy(factory);

  const SuspendedComponent = (props) => (
    <Suspense fallback={<Fallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  SuspendedComponent.preload = factory;

  return SuspendedComponent;
};
