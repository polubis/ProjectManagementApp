import React, { useMemo, useState, useCallback } from 'react';

import { Table } from 'ui';

import { TechnologyChip } from 'shared/components';

import { DictionaryKind, Dictionary } from '../..';

import TableItemMore from './table-item-more';
import ConfirmDictionaryDelete from './confirm-dictionary-delete';

import csx from './DictionariesTable.scss';

const BASE_CONFIG: Table.Config = {
  id: {
    size: {
      min: '60px',
      max: '60px',
    },
  },
  name: {
    size: {
      min: '200px',
      max: '200px',
    },
  },
  description: {
    size: {
      min: '300px',
      max: '1fr',
    },
  },
};

const optionsSize = {
  min: '120px',
  max: '120px',
};

namespace DictionariesTable {
  export interface Props {
    data: Dictionary[];
    kind: DictionaryKind;
  }
}

const getConfig = (
  kind: DictionaryKind,
  onDelete: (data: Dictionary) => void
): Table.Config => {
  if (kind === DictionaryKind.PATTERNS) {
    return {
      ...BASE_CONFIG,
      options: {
        label: 'Options',
        row: (key, data) => (
          <TableItemMore
            kind={kind}
            data={data}
            onDelete={() => onDelete(data)}
          />
        ),
        size: optionsSize,
      },
    };
  }

  if (kind === DictionaryKind.TECHNOLOGIES) {
    return {
      ...BASE_CONFIG,
      name: {
        ...BASE_CONFIG.name,
        row: (key, data) => (
          <TechnologyChip name={data.name} url={data.pictureUrl} />
        ),
      },
      options: {
        label: 'Options',
        row: (key, data) => (
          <TableItemMore
            kind={kind}
            data={data}
            onDelete={() => onDelete(data)}
          />
        ),
        size: optionsSize,
      },
    };
  }

  throw new Error(`No config for ${kind} kind`);
};

const DictionariesTable = ({ data, kind }: DictionariesTable.Props) => {
  const [dictionaryToDelete, setDictionaryToDelete] = useState<Dictionary>(
    null
  );

  const closeDelete = useCallback(() => {
    setDictionaryToDelete(null);
  }, []);

  const config = useMemo(() => getConfig(kind, setDictionaryToDelete), [
    data,
    kind,
  ]);

  return (
    <div className={csx.dictionariesTable}>
      <Table config={config} data={data} />

      {dictionaryToDelete && (
        <ConfirmDictionaryDelete
          data={dictionaryToDelete}
          kind={kind}
          onClose={closeDelete}
        />
      )}
    </div>
  );
};

export default DictionariesTable;
