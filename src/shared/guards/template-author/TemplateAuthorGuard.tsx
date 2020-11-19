import React, { ReactNode } from 'react';
import { Redirect } from 'react-router';

import { useAuthProvider } from 'core/auth';

import { useTemplateDetailsProvider } from 'shared/providers/template-details';

namespace TemplateAuthorGuard {
  export interface Props {
    children: ReactNode;
    redirect?: string;
  }
}

const TemplateAuthorGuard = ({
  children,
  redirect,
}: TemplateAuthorGuard.Props) => {
  const { authorized, user } = useAuthProvider();

  const { template } = useTemplateDetailsProvider();

  return (
    <>
      {authorized && template && template.addedBy === user.username ? (
        children
      ) : redirect ? (
        <Redirect to={redirect} />
      ) : null}
    </>
  );
};

export default TemplateAuthorGuard;
