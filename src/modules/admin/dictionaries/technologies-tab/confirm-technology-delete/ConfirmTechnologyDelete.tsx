import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { deleteTechnology, Technology } from 'core/api';

import { ConfirmDelete } from 'shared/components';

export namespace ConfirmTechnologyDelete {
  export interface Props {
    technology: Technology;
    onClose(): void;
  }
}

const ConfirmTechnologyDelete = ({ technology, onClose }: ConfirmTechnologyDelete.Props) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);

  const handleDelete = useCallback(async () => {
    setPending(true);

    try {
      await deleteTechnology(technology.id);

      history.push('/app/admin/dictionaries/technologies');

      onClose();
    } catch {
      setPending(false);
    }
  }, []);

  return (
    <ConfirmDelete
      cancelDisabled={pending}
      deleteDisabled={pending}
      description={() => (
        <>
          This will delete technology <b>{technology.name}</b>
        </>
      )}
      title="You are about to delete technology"
      onClose={onClose}
      onDelete={handleDelete}
    />
  );
};

export default ConfirmTechnologyDelete;
