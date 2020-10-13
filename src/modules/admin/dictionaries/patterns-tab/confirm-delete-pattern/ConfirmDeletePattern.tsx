import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { deletePattern, Pattern } from 'core/api';

import { ConfirmDelete } from 'shared/components';

export namespace ConfirmDeletePattern {
  export interface Props {
    pattern: Pattern;
    onClose(): void;
  }
}

const ConfirmDeletePattern = ({ pattern, onClose }: ConfirmDeletePattern.Props) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);

  const handleDelete = useCallback(async () => {
    setPending(true);

    try {
      await deletePattern(pattern.id);

      history.push('/app/admin/dictionaries/patterns');

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
          This will delete pattern <b>{pattern.name}</b>
        </>
      )}
      title="You are about to delete pattern"
      onClose={onClose}
      onDelete={handleDelete}
    />
  );
};

export default ConfirmDeletePattern;
