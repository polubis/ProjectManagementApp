import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteChildrenProps, useHistory } from 'react-router';

import { Avatar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';

import { Button, Loader, More, Tags } from 'ui';

import { convertDate } from 'utils';

import { Template } from 'core/api';

import { TemplateTags, TemplateStats, TechnologyChip } from 'shared/components';
import { TemplateAuthorGuard } from 'shared/guards';
import TemplateDetailsProvider, {
  useTemplateDetailsProvider
} from 'shared/providers/template-details';

import ConfirmDelete from './confirm-delete';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export interface Props extends RouteChildrenProps<{ id: string }> {}
}

const toNames = (template: Template) => () =>
  template ? template.patterns.map(({ name }) => name) : [];

const TemplateDetails = ({ match }: TemplateDetails.Props) => {
  const { replace } = useHistory();

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

  const patternsNames = useMemo(toNames(template), [template]);

  return (
    <div className={csx.templateDetails}>
      {loading ? (
        <Loader />
      ) : (
        !error && (
          <>
            {confirmDeleteOpen && (
              <ConfirmDelete template={template} onClose={closeConfirmDelete} />
            )}

            <header>
              <NavLink to={`${match.url}/documentation`}>
                <Button>
                  <MenuBookIcon /> DOCS
                </Button>
              </NavLink>

              <a href={template.githubLink} target="_blank">
                <Button>
                  <ShareIcon /> SOURCE
                </Button>
              </a>

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

              <TemplateStats stars={template.stars} watches={template.watches} />

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
                      avatar={technology.pictureUrl}
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
