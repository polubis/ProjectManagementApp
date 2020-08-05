import React, { useState, useEffect } from 'react';

import csx from './ContentGrid.scss';

interface Props {
  content: any;
  rows: number;
  cols: number;
  onDragOver: any;
  onDrop: any;
  onResizeFinish: any;
}

let startX, startY, startWidth, startHeight, resizedElId;

const ContentGrid = ({ content, cols, rows, onDragOver, onDrop, onResizeFinish }: Props) => {
  const [hoveredTuple, setHoveredTuple] = useState(-1);

  const [resizedElement, setResizedElement] = useState(null);

  const [obscuredTuple, setObscuredTuple] = useState(-1);

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();

    setObscuredTuple(+e.currentTarget.getAttribute('data-id'));
    onDragOver();
  };

  const handleDrop = e => {
    e.preventDefault();
    onDrop(e);
  };

  const handleMouseOver = e => {
    setHoveredTuple(+e.currentTarget.getAttribute('data-id'));
  };

  const handleMouseOut = () => {
    setHoveredTuple(-1);
  };

  const tupleCount = cols * rows;

  const spaces = Array.from({ length: tupleCount }, (_, idx) => idx);

  const gridTemplateRows = Array.from({ length: cols }, () => `1fr`).join(' ');

  const gridTemplateColumns = Array.from({ length: cols }, () => `1fr`).join(' ');

  const handleMove = e => {
    const currWidth = startWidth + e.clientX - startX + 'px';
    const currHeight = startHeight + e.clientY - startY + 'px';

    setResizedElement({ width: currWidth, height: currHeight, id: resizedElId });
  };

  console.log(resizedElement);

  const handleUp = () => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleUp);

    onResizeFinish(resizedElement.width, resizedElement.height);

    setResizedElement(null);

    startWidth = undefined;
    startHeight = undefined;
    startY = undefined;
    startX = undefined;
    resizedElId = undefined;
  };

  const handleResize = e => {
    const tuple = document.getElementById('hovered-tuple');

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(tuple).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(tuple).height, 10);
    resizedElId = hoveredTuple;

    document.addEventListener('mousemove', handleMove, false);
    document.addEventListener('mouseup', handleUp, false);
  };

  useEffect(() => {
    document.addEventListener('dragend', () => {
      setObscuredTuple(-1);
    });
  }, []);

  return (
    <div style={{ gridTemplateColumns, gridTemplateRows }} className={csx.contentGrid}>
      {spaces.map((grid, idx) => (
        <div
          key={grid}
          data-id={idx}
          style={{ gridColumnStart: '', gridColumnEnd: '', gridRowStart: '', gridRowEnd: '' }}
          onDragOver={handleDragOver}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onDrop={handleDrop}
        >
          {content[grid].Component()}

          {obscuredTuple === idx && <div className={csx.obscuredHighlight} />}

          {hoveredTuple === idx && (
            <div id="hovered-tuple" className={csx.hoveredHighlight}>
              <div data-id={idx} onMouseDown={handleResize} />
              <div data-id={idx} onMouseDown={handleResize} />
            </div>
          )}

          {resizedElement && resizedElement.id === idx && (
            <div
              className={csx.resizedElement}
              style={{ height: resizedElement.height, width: resizedElement.width }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
