import React, { useEffect, useCallback, useState, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteChildrenProps, useHistory } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import { Button, More } from 'ui';

import { TemplateAuthorGuard, Guard } from 'shared/guards';
import TemplateDetailsProvider, {
  useTemplateDetailsProvider,
} from 'shared/providers/template-details';
import { useTemplatesHistoryProvider } from 'shared/providers/templates-history';

import ConfirmTemplateDelete from './confirm-template-delete';
import ForkTemplate from './fork-template';
import TemplateDetailsContent from './template-details-content';
import TemplateDetailsContentLoader from './template-details-content-loader';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export type Props = RouteChildrenProps<{ id: string }>;
}

const TemplateDetails = ({ match }: TemplateDetails.Props) => {
  const { addToHistory } = useTemplatesHistoryProvider();

  const { replace } = useHistory();

  const [forkOpen, setForkOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { template, error, loading, getTemplateDetails } = useTemplateDetailsProvider();

  useEffect(() => {
    if (error) {
      replace('/app/templates');
    }
  }, [error]);

  useEffect(() => {
    getTemplateDetails(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (template) {
      addToHistory(template);
    }
  }, [template]);

  const openConfirmDelete = useCallback(() => {
    setConfirmDeleteOpen(true);
  }, []);

  const closeConfirmDelete = useCallback(() => {
    setConfirmDeleteOpen(false);
  }, []);

  const openFork = useCallback(() => {
    setForkOpen(true);
  }, []);

  const closeFork = useCallback(() => {
    setForkOpen(false);
  }, []);

  return (
    <div className={csx.templateDetails}>
      {loading ? (
        <TemplateDetailsContentLoader />
      ) : (
        !error && (
          <>
            {confirmDeleteOpen && (
              <ConfirmTemplateDelete template={template} onClose={closeConfirmDelete} />
            )}

            {forkOpen && <ForkTemplate template={template} onClose={closeFork} />}

            <header>
              <NavLink to={`${match.url}/documentation`}>
                <Button>
                  <MenuBookIcon /> DOCS
                </Button>
              </NavLink>

              <a href={template.githubLink} rel="noreferrer" target="_blank">
                <Button>
                  <ShareIcon /> SOURCE
                </Button>
              </a>

              <Guard.Protected>
                {({ user }) =>
                  user.connectedWithGithub &&
                  user.username !== template.addedBy && (
                    <Button onClick={openFork}>
                      <DeviceHubIcon /> FORK
                    </Button>
                  )
                }
              </Guard.Protected>

              <TemplateAuthorGuard>
                <More>
                  <NavLink to={`/app/templates/management/${match.params.id}`} className={csx.edit}>
                    <EditIcon />
                    EDIT
                  </NavLink>
                  <div className={csx.delete} onClick={openConfirmDelete}>
                    <DeleteIcon />
                    DELETE
                  </div>
                </More>
              </TemplateAuthorGuard>
            </header>

            <TemplateDetailsContent template={template} />
          </>
        )
      )}
    </div>
  );
};

const ConnectedTemplateDetails: FC<TemplateDetails.Props> = (props) => (
  <TemplateDetailsProvider>
    <TemplateDetails {...props} />
  </TemplateDetailsProvider>
);

export default ConnectedTemplateDetails;
