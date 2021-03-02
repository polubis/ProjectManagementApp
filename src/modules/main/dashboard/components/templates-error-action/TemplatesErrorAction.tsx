import React, { FC, memo } from 'react';

import { Button, ErrorAction } from 'ui';

namespace TemplatesErrorAction {
  export interface Props {
    onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  }
}

const TemplatesErrorAction: FC<TemplatesErrorAction.Props> = memo(
  ({ onClick }) => {
    return (
      <ErrorAction
        description="Right now we cannot load templates. Please try again later"
        operations={<Button onClick={onClick}>RELOAD TEMPLATES</Button>}
        title="Templates load failed"
      />
    );
  },
  () => true
);

export default TemplatesErrorAction;
