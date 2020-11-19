import React from 'react';

import { StepHeader } from 'ui';

import EmailSentImage from './EmailSentImage';

import csx from './EmailSent.scss';

namespace EmailSent {
  export interface Props {
    description: string;
    label: string;
    children: React.ReactNode | React.ReactNode[];
  }
}

const EmailSent = ({ description, label, children }: EmailSent.Props) => (
  <div className={csx.emailSent}>
    <StepHeader description={description} label={label} />

    <EmailSentImage />

    <footer>{children}</footer>
  </div>
);

export default EmailSent;
