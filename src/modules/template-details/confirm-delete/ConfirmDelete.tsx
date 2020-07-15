import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { Modal, Button, InputField } from 'ui';

import { Form } from 'utils';

import { deleteTemplate, Template } from 'core/api';

import { BucketImage } from '.';

import csx from './ConfirmDelete.scss';

export namespace ConfirmDelete {
  export interface Props {
    template: Template;
    onClose(): void;
  }

  export interface Status {
    pending: boolean;
    error: string;
  }
}

const STATUS: ConfirmDelete.Status = { pending: false, error: '' };

const ConfirmDelete = ({ template, onClose }: ConfirmDelete.Props) => {
  const history = useHistory();

  const [status, setStatus] = useState(STATUS);
  const [name, setName] = useState('');

  const { pending } = status;

  const handleNameChange = useCallback((e: Form.Events.Change) => {
    setName(e.target.value);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!pending) {
      setStatus({ ...STATUS, pending: true });

      try {
        await deleteTemplate(template.id);
        history.push('/app/templates');
      } catch (error) {
        setStatus({ ...STATUS, error });
      }
    }
  }, []);

  const handleClose = useCallback(() => {
    if (!pending) {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal className={csx.confirmDelete}>
      <figure>
        <BucketImage />
      </figure>

      <header>
        <h5>You are about to delete template</h5>
        <span>
          This will delete template <b>{template.name}</b> with all connected work
        </span>
      </header>

      <InputField
        label="Template name *"
        placeholder="Confirm by type template name..."
        className={csx.field}
        disabled={pending}
        value={name}
        onChange={handleNameChange}
      />

      <footer>
        <Button theme="primaryTransparent" disabled={pending} onClick={handleClose}>
          CANCEL
        </Button>
        <Button theme="danger" disabled={name !== template.name || pending} onClick={handleDelete}>
          DELETE
        </Button>
      </footer>
    </Modal>
  );
};

export default ConfirmDelete;
