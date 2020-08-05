import React, { useEffect, useState } from 'react';

import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider
} from './TemplateDocumentationProvider';

import ContentTree from './content-tree';

import csx from './TemplateDocumentation.scss';
import Toolbar from './toolbar/Toolbar';
import ContentGrid from './content-grid/ContentGrid';

const ROWS = 2,
  COLS = 3;

const makeInitContent = (rows, cols) => {
  const tuples = rows * cols;

  return Array.from({ length: tuples }, (_, idx) => idx).reduce((prev, idx) => {
    return {
      ...prev,
      [idx]: {
        Component: () => {}
      }
    };
  }, {});
};

const Components = {
  Carousel: () => <div>Carousel</div>,
  ContentGrid: () => <div>ContentGrid</div>
};

const items = [
  { id: 'Content grid', Component: () => <div>Content Grid</div>, type: 'Carousel' },
  { id: 'Carousel', Component: () => <div>Carousel</div>, type: 'ContentGrid' },
  { id: 'Carousel2', Component: () => <div>Carousel2</div>, type: 'Carousel' },
  { id: 'Carusel 3', Component: () => <div>Carousel3</div>, type: 'Carousel' }
];

const TemplateDocumentation = () => {
  const [content, setContent] = useState(makeInitContent(ROWS, COLS));

  const { documentation, loading, getTemplateDocumentation } = useTemplateDocumentationProvider();

  useEffect(() => {
    getTemplateDocumentation('https://github.com/jamiebuilds/react-loadable');
  }, []);

  const handleDragStart = e => {
    e.dataTransfer.setData('id', e.target.id);
    e.dataTransfer.setData('type', e.currentTarget.getAttribute('data-type'));
  };

  const handleDrop = e => {
    const id = e.currentTarget.getAttribute('data-id');
    const type = e.dataTransfer.getData('type');

    if (!id || !type) {
      return;
    }

    setContent(prevContent => ({
      ...prevContent,
      [id]: {
        ...prevContent[id],
        Component: Components[type]
      }
    }));
  };

  const handleResizeFinish = (width, height) => {
    console.log(width, height);
  }

  return (
    <div className={csx.templateDocumentation}>
      <ContentGrid
        content={content}
        cols={COLS}
        rows={ROWS}
        onDragOver={() => {}}
        onDrop={handleDrop}
        onResizeFinish={handleResizeFinish}
      />

      <Toolbar>
        {items.map(({ id, Component }) => (
          <div key={id} draggable data-type="ContentGrid" onDragStart={handleDragStart}>
            {Component()}
          </div>
        ))}
      </Toolbar>
    </div>
  );
};

export default () => (
  <TemplateDocumentationProvider>
    <TemplateDocumentation />
  </TemplateDocumentationProvider>
);
