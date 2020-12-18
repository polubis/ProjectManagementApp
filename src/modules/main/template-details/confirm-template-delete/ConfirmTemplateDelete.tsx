import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { InputField } from 'ui';

import { Form } from 'utils';

import { deleteTemplate } from 'shared/services';
import { ConfirmDelete } from 'shared/components';
import { Template } from 'shared/models';
import { useAlertsProvider } from 'shared/providers/alerts';

export namespace ConfirmTemplateDelete {
  export interface Props {
    template: Template;
    onClose(): void;
  }
}

const ConfirmTemplateDelete = ({ template, onClose }: ConfirmTemplateDelete.Props) => {
  const history = useHistory();

  const { showAlert } = useAlertsProvider();

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
      showAlert({
        message: 'Error occured while deleting template. Please try again',
      });
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
