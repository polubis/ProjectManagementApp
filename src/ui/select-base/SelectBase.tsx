import React, {
  ReactElement,
  ComponentType,
  useCallback,
  useMemo,
  useState,
  cloneElement
} from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import SearchIcon from '@material-ui/icons/Search';

import { Form } from 'utils';

import { Checkbox, Menu, useMenu } from '..';

import SelectedItems from './selected-items';

import csx from './SelectBase.scss';

namespace SelectBase {
  export namespace Events {
    export type Click = React.MouseEvent<HTMLElement, MouseEvent>;
  }

  export type OnSelect = (dataIdx: string, value: boolean) => void;

  export type RenderSelectItem = (props: Item) => ReactElement;

  export interface Item {
    dataIdx: string;
    label: string;
    value: boolean;
  }

  export interface ListChildData {
    items: Item[];
    onSelect: Checkbox.OnChange;
  }

  export interface Props {
    children: ReactElement;
    items: Item[];
    listItem: ComponentType<ListChildComponentProps>;
    renderSelectedItem?: RenderSelectItem;
    loading?: boolean;
    height?: number;
    itemSize?: number;
    searchable?: boolean;
    width?: number;
    onSelect: OnSelect;
  }

  export interface ChildrenInjectedProps {
    loading: boolean;
    menuOpen: boolean;
    onClick(e: Events.Click): void;
  }

  export interface ListChildProps extends Omit<ListChildComponentProps, 'data'> {
    data: ListChildData;
  }
}

const filterItems = (phrase: string, items: SelectBase.Item[]) => () =>
  phrase ? items.filter(({ label }) => label.toLowerCase().includes(phrase.toLowerCase())) : items;

const getSelected = (value: { [key: string]: boolean }) =>
  Object.keys(value).filter((k) => value[k]);

const SelectBase = ({
  children,
  items,
  listItem,
  renderSelectedItem,
  loading = false,
  height = 300,
  itemSize = 48,
  searchable = true,
  width = 300,
  onSelect
}: SelectBase.Props) => {
  const [phrase, setPhrase] = useState('');

  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  const handleSelect: Checkbox.OnChange = useCallback(
    (e, value) => {
      onSelect(e.currentTarget.getAttribute('data-idx'), value);
    },
    [onSelect]
  );

  const handleChange = useCallback((e: Form.Events.Change) => {
    setPhrase(e.target.value);
  }, []);

  const enhancedControlComponent = React.Children.map(
    children,
    (child: ReactElement<SelectBase.ChildrenInjectedProps>) =>
      cloneElement(child, {
        ...child.props,
        loading,
        menuOpen,
        onClick: (e: SelectBase.Events.Click) => {
          if (child.props.onClick) {
            child.props.onClick(e);
          }

          openMenu(e);
        }
      })
  );

  const filteredItems = useMemo(filterItems(phrase, items), [phrase, items]);

  const itemsData: SelectBase.ListChildData = useMemo(
    () => ({
      items: filteredItems,
      onSelect: handleSelect
    }),
    [filteredItems, handleSelect]
  );

  return (
    <>
      {enhancedControlComponent}

      {menuOpen && (
        <Menu anchorEl={anchorEl} keepMounted={false} width={width} onClose={closeMenu}>
          {searchable && (
            <header className={csx.search}>
              <SearchIcon />
              <input placeholder="Filter items..." onChange={handleChange} />
            </header>
          )}

          <div className={csx.list}>
            <FixedSizeList
              itemCount={filteredItems.length}
              itemData={itemsData}
              itemSize={itemSize}
              height={height}
              width={width}
            >
              {listItem}
            </FixedSizeList>
          </div>

          {renderSelectedItem && <SelectedItems items={items} renderItem={renderSelectedItem} />}
        </Menu>
      )}
    </>
  );
};

SelectBase.getSelected = getSelected;

export default SelectBase;
