import React from 'react';

import { Tree } from 'ui';

import TreeItem from './tree-item';

import csx from './ContentTree.scss';

const ContentTree = (props: Tree.Props) => {
  return (
    <div className={csx.contentTree}>
      <Tree {...props}>{TreeItem}</Tree>
    </div>
  );
};

export default ContentTree;
