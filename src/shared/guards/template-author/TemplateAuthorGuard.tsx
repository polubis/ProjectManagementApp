import React, { ReactNode } from 'react';

import { useAuthProvider } from 'core/auth';

namespace TemplateAuthorGuard {
  export interface Props {
    authorUsername: string;
    children: ReactNode;
  }
}

const TemplateAuthorGuard = ({ authorUsername, children }: TemplateAuthorGuard.Props) => {
  const { authorized, user } = useAuthProvider();

  return <>{authorized && authorUsername === user.username ? children : null}</>;
};

export default TemplateAuthorGuard;
