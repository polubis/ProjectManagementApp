import React from 'react';

import csx from './ContentGrid.scss';

namespace ContentGrid {
  export type ContentMap = {
    [key: number]: string;
  };

  export type ComponentsMap = {
    [key: string]: (style: React.CSSProperties) => React.ReactElement;
  };

  export interface Props {
    components: ComponentsMap;
    content: ContentMap;
    cols: number;
    rows: number;
  }
}

const getLayoutStyle = (cols: number, rows: number): React.CSSProperties => {
  const toFrFormat = (length: number) =>
    Array.from({ length })
      .map(() => '1fr')
      .join(' ');

  return {
    gridTemplateColumns: toFrFormat(cols),
    gridTemplateRows: toFrFormat(rows)
  };
};

const getPlaceholdersStyles = (mask: number[][]) =>
  mask.reduce((acc, cols, rIdx) => {
    const mappedCols = cols.map(
      (_, cIdx) =>
        ({
          gridRow: `${rIdx + 1}/${rIdx + 1}`,
          gridColumn: `${cIdx + 1}/${cIdx + 1}`
        } as React.CSSProperties)
    );

    return [...acc, ...mappedCols] as React.CSSProperties[];
  }, [] as React.CSSProperties[]);

const getGridMask = (cols: number, rows: number) =>
  Array.from({ length: rows }, (_, rIdx) =>
    Array.from({ length: cols }).map((_, cIdx) => [rIdx + 1, cIdx + 1])
  ).reduce((acc, curr) => [...acc, ...curr], [] as number[][]);

const getMask = (cols: number, rows: number) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }).map((_, cIdx) => cIdx));

const getComponentStyle = (key: string, content: ContentGrid.ContentMap, gridMask: number[][]) => {
  const findMin = (cords: number[][], idx: 0 | 1) => {
    return cords.reduce((acc, curr) => {
      return curr[idx] < acc ? curr[idx] : acc;
    }, cords[0][idx]);
  };

  const findMax = (cords: number[][], idx: 0 | 1) => {
    return cords.reduce((acc, curr) => {
      return curr[idx] > acc ? curr[idx] : acc;
    }, cords[0][idx]);
  };

  const cords = Object.keys(content)
    .filter((cKey) => content[cKey] === key)
    .map((cKey) => gridMask[+cKey]);

  if (cords.length === 0) {
    return {};
  }

  const rowStart = findMin(cords, 0);
  const rowEnd = findMax(cords, 0) + 1;

  const colStart = findMin(cords, 1);
  const colEnd = findMax(cords, 1) + 1;

  return {
    gridColumn: `${colStart}/${colEnd}`,
    gridRow: `${rowStart}/${rowEnd}`
  } as React.CSSProperties;
};

const ContentGrid = ({ content, components, cols, rows }: ContentGrid.Props) => {
  const layoutStyle = getLayoutStyle(cols, rows);

  const mask = getMask(cols, rows);

  const gridMask = getGridMask(cols, rows);

  return (
    <div className={csx.contentGrid} style={layoutStyle}>
      {Object.keys(components).map((key) => (
        <React.Fragment key={key}>
          {components[key]({ ...getComponentStyle(key, content, gridMask), background: 'red' })}
        </React.Fragment>
      ))}

      {getPlaceholdersStyles(mask)
        .filter((_, idx) => !content.hasOwnProperty(idx))
        .map((style, idx) => (
          <div key={idx} className={csx.placeholder} style={style}>
            {idx}
          </div>
        ))}
    </div>
  );
};

export default ContentGrid;
