import React, { FC, ReactNode, Fragment } from 'react';

import WidgetsIcon from '@material-ui/icons/Widgets';

import csx from './NavigationList.scss';

namespace NavigationList {
  export interface ChildItem {
    id: number;
    label: string;
    active?: boolean;
  }

  export interface ParentItem {
    children: ChildItem[];
    icon: ReactNode;
    id: number;
    expanded?: boolean;
    active?: boolean;
    label: string;
  }

  export type OnChildClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    parent: ParentItem,
    child: ChildItem
  ) => void;

  export type OnParentClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    parent: ParentItem
  ) => void;

  export interface Props {
    className?: string;
    iconSize?: number;
    height?: number;
    items: ParentItem[];
    onChildClick: OnChildClick;
    onParentClick: OnParentClick;
  }
}

const DISTANCE_ASPECT_RATIO = 8;
const ITEM_HEIGHT = 48;
const ICON_SIZE = 24;
const ICON_HIGHLIGHT_RANGE_RATIO = 12;

const NavigationList: FC<NavigationList.Props> = ({
  className,
  iconSize,
  height,
  items,
  onChildClick,
  onParentClick,
}) => {
  const parentLabelLeftMargin = (DISTANCE_ASPECT_RATIO / height) * 100;
  const childrenLabelLeftMargin = parentLabelLeftMargin + ICON_SIZE;
  const iconHighlightSize = ICON_SIZE + ICON_HIGHLIGHT_RANGE_RATIO;

  const handleChildClick: NavigationList.OnChildClick = (e, parent, child) => {
    e.stopPropagation();
    onChildClick(e, parent, child);
  };

  return (
    <ul className={`${csx.navigationList} ${className}`}>
      {items.map((parent) => (
        <Fragment key={parent.id}>
          <li
            className={`${csx.parent} ${parent.active ? csx.active : ''}`}
            style={{
              height,
            }}
            onClick={(e) => onParentClick(e, parent)}
          >
            <div className={csx.icon} style={{ width: iconSize, height: iconSize }}>
              {parent.expanded && (
                <div
                  className={csx.iconHighlight}
                  style={{ width: iconHighlightSize, height: iconHighlightSize }}
                />
              )}

              <WidgetsIcon />
            </div>
            <span
              className={csx.label}
              style={{
                marginLeft: parentLabelLeftMargin,
              }}
            >
              {parent.label}
            </span>
          </li>

          {parent.expanded && (
            <>
              {parent.children.map((child) => (
                <li
                  key={child.id}
                  className={`${csx.children} ${child.active ? csx.active : ''}`}
                  style={{
                    height,
                  }}
                  onClick={(e) => handleChildClick(e, parent, child)}
                >
                  <span
                    className={csx.label}
                    style={{
                      marginLeft: childrenLabelLeftMargin,
                    }}
                  >
                    {child.label}
                  </span>
                </li>
              ))}
            </>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

NavigationList.defaultProps = {
  className: '',
  iconSize: ICON_SIZE,
  height: ITEM_HEIGHT,
};

export default NavigationList;
