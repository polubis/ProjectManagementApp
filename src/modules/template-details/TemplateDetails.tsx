import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';

import { Button, Loader } from 'ui';

import { convertNumberToKFormat, convertDate } from 'utils';

import { TemplateTags } from 'shared/components';

import TemplateDetailsProvider, { useTemplateDetailsProvider } from './TemplateDetailsProvider';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export interface Props extends RouteChildrenProps<{ id: string }> {}
}

// TODO - CONNECT EDIT

const TemplateDetails = ({ match }: TemplateDetails.Props) => {
  const { template, loading, getTemplate } = useTemplateDetailsProvider();

  useEffect(() => {
    getTemplate(match.params.id);
  }, [match.params.id]);

  return (
    <div className={csx.templateDetails}>
      <div className={csx.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={csx.actions}>
              <Button>
                <EditIcon /> EDIT
              </Button>
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
