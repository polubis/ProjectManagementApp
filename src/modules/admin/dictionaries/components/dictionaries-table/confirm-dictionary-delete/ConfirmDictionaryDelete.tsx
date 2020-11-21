import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { deleteTechnology, deletePattern } from 'core/api';

import { ConfirmDelete } from 'shared/components';

import { DictionaryKind, Dictionary } from '../../..';

export namespace ConfirmDictionaryDelete {
  export interface Props {
    data: Dictionary;
    kind: DictionaryKind;
    onClose(): void;
  }
}

const ConfirmDictionaryDelete = ({ data, kind, onClose }: ConfirmDictionaryDelete.Props) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);

  const handleDelete = useCallback(async () => {
    setPending(true);

    try {
      const callApi = DictionaryKind.TECHNOLOGIES ? deleteTechnology : deletePattern;

      await callApi(data.id);

      history.push(`/app/admin/dictionaries/${kind}`);

      onClose();
    } catch {
      setPending(false);
    }
  }, []);

  const label = kind === DictionaryKind.TECHNOLOGIES ? 'technology' : 'pattern';

  return (
    <ConfirmDelete
      cancelDisabled={pending}
      deleteDisabled={pending}
      description={() => (
        <>
          This will delete {label} <b>{data.name}</b>
        </>
      )}
      title={`You are about to delete ${label}`}
      onClose={onClose}
      onDelete={handleDelete}
    />
  );
};

export default ConfirmDictionaryDelete;
