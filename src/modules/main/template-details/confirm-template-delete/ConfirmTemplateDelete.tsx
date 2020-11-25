import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { InputField } from 'ui';

import { Form } from 'utils';

import { deleteTemplate } from 'api';

import { ConfirmDelete } from 'shared/components';
import { Template } from 'shared/models';

export namespace ConfirmTemplateDelete {
  export interface Props {
    template: Template;
    onClose(): void;
  }
}

const ConfirmTemplateDelete = ({ template, onClose }: ConfirmTemplateDelete.Props) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);

  const [name, setName] = useState('');

  const handleNameChange = useCallback((e: Form.Events.Change) => {
    setName(e.target.value);
  }, []);

  const handleDelete = useCallback(async () => {
    setPending(true);

    try {
      await deleteTemplate(template.id);

      history.push('/app/templates');
    } catch {
      setPending(false);
    }
  }, []);

  return (
    <ConfirmDelete
      cancelDisabled={pending}
      deleteDisabled={name !== template.name || pending}
      description={() => (
        <>
          This will delete template <b>{template.name}</b> with all connected work
        </>
      )}
      title="You are about to delete template"
      onClose={onClose}
      onDelete={handleDelete}
    >
      <InputField
        label="Template name *"
        placeholder="Confirm by type template name..."
        disabled={pending}
        value={name}
        onChange={handleNameChange}
      />
    </ConfirmDelete>
  );
};

export default ConfirmTemplateDelete;
