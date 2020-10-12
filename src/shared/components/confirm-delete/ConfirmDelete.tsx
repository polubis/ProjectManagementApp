import React, { ReactElement } from 'react';

import { Modal, Button } from 'ui';

import BucketImage from './BucketImage';

import csx from './ConfirmDelete.scss';

export namespace ConfirmDelete {
  export interface Props {
    children?: ReactElement;
    cancelDisabled?: boolean;
    description: () => ReactElement | string;
    deleteDisabled?: boolean;
    title: string;
    onClose(): void;
    onDelete(): void;
  }
}

const ConfirmDelete = ({
  children,
  description,
  cancelDisabled,
  deleteDisabled,
  title,
  onClose,
  onDelete
}: ConfirmDelete.Props) => {
  return (
    <Modal className={csx.confirmDelete}>
      <figure>
        <BucketImage />
      </figure>

      <header>
        <h5>{title}</h5>
        <span>{typeof description === 'function' ? description() : description}</span>
      </header>

      <section>{children}</section>

      <footer>
        <Button theme="primaryTransparent" disabled={cancelDisabled} onClick={onClose}>
          CANCEL
        </Button>
        <Button theme="danger" disabled={deleteDisabled} onClick={onDelete}>
          DELETE
        </Button>
      </footer>
    </Modal>
  );
};

export default ConfirmDelete;
