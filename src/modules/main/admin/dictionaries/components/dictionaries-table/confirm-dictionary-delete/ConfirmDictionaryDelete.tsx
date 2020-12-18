import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { deleteTechnology, deletePattern } from 'shared/services';
import { ConfirmDelete } from 'shared/components';
import { useAlertsProvider } from 'shared/providers/alerts';

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

  const { showAlert } = useAlertsProvider();

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
      showAlert({ message: 'Error occured while deleteing dictionary. Please try again' });
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
