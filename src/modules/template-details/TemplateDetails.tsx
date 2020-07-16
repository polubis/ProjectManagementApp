import React, { useEffect, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';

import { Button, Loader, More } from 'ui';

import { useAuthProvider } from 'core/auth';

import { convertNumberToKFormat, convertDate } from 'utils';

import { TemplateTags } from 'shared/components';

import TemplateDetailsProvider, {
  useTemplateDetailsProvider
} from 'shared/providers/template-details';

import ConfirmDelete from './confirm-delete';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export interface Props extends RouteChildrenProps<{ id: string }> {}
}

const TemplateDetails = ({ match }: TemplateDetails.Props) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { template, loading, getTemplateDetails } = useTemplateDetailsProvider();

  const { user, authorized } = useAuthProvider();

  useEffect(() => {
    getTemplateDetails(match.params.id);
  }, [match.params.id]);

  const openConfirmDelete = useCallback(() => {
    setConfirmDeleteOpen(true);
  }, []);

  const closeConfirmDelete = useCallback(() => {
    setConfirmDeleteOpen(false);
  }, []);

  return (
    <div className={csx.templateDetails}>
      <div className={csx.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {confirmDeleteOpen && (
              <ConfirmDelete template={template} onClose={closeConfirmDelete} />
            )}

            <div className={csx.actions}>
              <NavLink to={`${match.url}/documentation`}>
                <Button>
                  <MenuBookIcon /> DOCS
                </Button>
              </NavLink>

              <Link to={{ pathname: template.githubLink }} target="_blank">
                <Button>
                  <ShareIcon /> SOURCE
                </Button>
              </Link>
              {user !== null && authorized && template.addedBy === user.username ? (
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
              ) : null}
            </div>

            <section>
              <TemplateTags tags={template.tags} />
            </section>

            <section className={csx.details}>
              <span className={csx.watches}>
                <VisibilityIcon />
                {convertNumberToKFormat(template.watches)}
              </span>
              <span className={csx.stars}>
                <StarBorderIcon />
                {convertNumberToKFormat(template.stars)}
              </span>
              <p className={csx.createdBy}>
                Created at {convertDate(template.createdDate)} by {template.addedBy}
              </p>
            </section>

            <section>
              <h2 className={csx.header}>
                <span>{template.name}</span>
              </h2>

              <p className={csx.description}>{template.description}</p>
            </section>

            <section className={csx.col}>
              <h3 className={csx.header}>
                <span>Tech stack</span>
              </h3>
              <ul className={`${csx.basicList} ${csx.technologies}`}>
                {template.technologies.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </section>

            <section className={csx.col}>
              <h3 className={csx.header}>
                <span>Patterns</span>
              </h3>
              <ul className={`${csx.basicList} ${csx.patterns}`}>
                {template.patterns.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </section>

            <section className={csx.col}>
              <h3 className={csx.header}>
                <span>Authors</span>
              </h3>
              <ul className={csx.authors}>
                {template.contributors.map(({ name, avatar }) => (
                  <li key={name}>
                    <img src={avatar} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default (props: TemplateDetails.Props) => (
  <TemplateDetailsProvider>
    <TemplateDetails {...props} />
  </TemplateDetailsProvider>
);
