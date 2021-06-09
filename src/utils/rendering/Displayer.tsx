import React, { ComponentType, ReactElement } from 'react';

namespace Displayer {
  type RenderProp = (props: unknown) => ReactElement;

  type Children = ComponentType<unknown> | RenderProp;

  export interface Props {
    empty?: boolean;
    loading?: boolean;
    error?: boolean;
    children: [Children, Children, Children, Children];
  }
}

const Displayer = ({ loading, empty, error, children }: Displayer.Props): JSX.Element => {
  const [LoaderComponent, EmptyComponent, DataComponent, ErrorComponent] = children;

  if (loading && LoaderComponent) {
    return <LoaderComponent />;
  }

  if (empty && EmptyComponent) {
    return <EmptyComponent />;
  }

  if (error && ErrorComponent) {
    return <ErrorComponent />;
  }

  if (DataComponent) {
    return <DataComponent />;
  }

  return null;
};

export default Displayer;
