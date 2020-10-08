import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { Modal, Button, InputField } from 'ui';

import { Form } from 'utils';

import {
  deletePattern,
  deleteTechnology,
  deleteTemplate,
  Pattern,
  Technology,
  Template
} from 'core/api';

import { BucketImage } from '.';

import csx from './ConfirmDelete.scss';

namespace ConfirmDelete {
  export interface Props {
    category: Template | Pattern | Technology;
    onClose(): void;
  }

  export interface Status {
    pending: boolean;
    error: string;
  }
}

const isTemplate = (category: Template | Pattern | Technology): category is Template => {
  return category.discriminator === 'templates';
};
const isPattern = (category: Template | Pattern | Technology): category is Pattern => {
  return category.discriminator === 'patterns';
};

const STATUS: ConfirmDelete.Status = { pending: false, error: '' };

export const ConfirmDelete = ({ category, onClose }: ConfirmDelete.Props) => {
  const history = useHistory();

  const [status, setStatus] = useState(STATUS);
  const [name, setName] = useState('');

  const { pending } = status;

  const categoryTitle = isTemplate(category)
    ? 'template'
    : isPattern(category)
    ? 'pattern'
    : 'technology';

  const handleNameChange = useCallback((e: Form.Events.Change) => {
    setName(e.target.value);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!pending) {
      setStatus({ ...STATUS, pending: true });

      try {
        if (isTemplate(category)) {
          await deleteTemplate(category.id);
          history.push('/app/templates');
        } else if (isPattern(category)) {
          await deletePattern(category.id);
          // temporary solution
          history.push('/app/admin/dictionaries/patterns');
        } else {
          await deleteTechnology(category.id);
          // temporary solution
          history.push('/app/admin/dictionaries/technologies');
        }
      } catch (error) {
        setStatus({ ...STATUS, error });
      }
      handleClose();
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
        <h5>You are about to delete {categoryTitle}</h5>
        <span>
          This will delete {categoryTitle} <b>{category.name}</b> with all connected work
        </span>
        {!isTemplate(category) && (
          <span>All templates that use this {categoryTitle} will be updated</span>
        )}
      </header>

      {isTemplate(category) && (
        <InputField
          label="Template name *"
          placeholder="Confirm by type template name..."
          className={csx.field}
          disabled={pending}
          value={name}
          onChange={handleNameChange}
        />
      )}

      <footer>
        <Button theme="primaryTransparent" disabled={pending} onClick={handleClose}>
          CANCEL
        </Button>
        <Button
          theme="danger"
          disabled={(!isTemplate && name !== category.name) || pending}
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </footer>
    </Modal>
  );
};

export default ConfirmDelete;
