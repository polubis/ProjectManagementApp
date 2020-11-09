import React from 'react';

import { Tree } from 'ui';

import TreeItem from './tree-item';

import csx from './ContentTree.scss';

namespace ContentTree {
  export interface Props extends Omit<Tree.Props, 'children'> {}
}

const ContentTree = (props: ContentTree.Props) => {
  return (
    <div className={csx.contentTree}>
      <Tree {...props}>{TreeItem}</Tree>
    </div>
  );
};

export default ContentTree;
