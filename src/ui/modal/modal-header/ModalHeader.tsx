import React from 'react';

import csx from './ModalHeader.scss';

namespace ModalHeader {
  export interface Props {
    description: string;
    label: string;
  }
}

const ModalHeader = ({ description, label }: ModalHeader.Props) => {
  return (
    <header className={csx.modalHeader}>
      <h5 className={csx.label}>{label}</h5>
      <span className={csx.description}>{description}</span>
    </header>
  );
};

export default ModalHeader;
