import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteChildrenProps, useHistory } from 'react-router';

import { Avatar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import { Button, More, Tags } from 'ui';

import { convertDate } from 'utils';

import { TemplateTags, TemplateStats, TechnologyChip } from 'shared/components';
import { TemplateAuthorGuard, Guard } from 'shared/guards';
import { Template } from 'shared/models';
import TemplateDetailsProvider, {
  useTemplateDetailsProvider,
} from 'shared/providers/template-details';

import ConfirmTemplateDelete from './confirm-template-delete';
import ContentLoader from './content-loader';
import ForkTemplate from './fork-template';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export type Props = RouteChildrenProps<{ id: string }>;
}

const toNames = (template: Template) => () =>
  template ? template.patterns.map(({ name }) => name) : [];

const TemplateDetails = ({ match }: TemplateDetails.Props) => {
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

  const patternsNames = useMemo(toNames(template), [template]);

  return (
    <div className={csx.templateDetails}>
      {loading ? (
        <ContentLoader />
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

            <section>
              <TemplateTags className={csx.tags} items={template.tags} />

              <TemplateStats
                patterns={template.patterns.length}
                stars={template.stars}
                technologies={template.technologies.length}
                watches={template.watches}
              />

              <p className={csx.date}>
                Created <span>{convertDate(template.createdDate)}</span>
                {!!template.modifiedDate && (
                  <>
                    {' '}
                    and modified <span>{convertDate(template.modifiedDate)}</span>
                  </>
                )}
              </p>

              <h1>{template.name}</h1>

              <span className={csx.description}>{template.description}</span>

              <div className={csx.technologies}>
                <h5>Technologies</h5>

                <div>
                  {template.technologies.map((technology) => (
                    <TechnologyChip
                      key={technology.id}
                      name={technology.name}
                      url={technology.pictureUrl}
                    />
                  ))}
                </div>
              </div>

              <div className={csx.patterns}>
                <h5>Patterns</h5>

                <Tags items={patternsNames} />
              </div>

              <div className={csx.contributors}>
                <h5>Authors</h5>

                <div>
                  {template.contributors.map((contributor) => (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      key={contributor.name}
                      href={`https://github.com/${contributor.name}`}
                      title={contributor.name}
                    >
                      <Avatar src={contributor.avatar} />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </>
        )
      )}
    </div>
  );
};

export default (props: TemplateDetails.Props) => (
  <TemplateDetailsProvider>
    <TemplateDetails {...props} />
  </TemplateDetailsProvider>
);
