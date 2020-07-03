import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

import TemplateDetailsProvider, { useTemplateDetailsProvider } from './TemplateDetailsProvider';

import { convertNumberToKFormat, convertDate } from 'utils';

import { Contributors } from 'core/api';

import { CircularProgress } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';

import { Button } from 'ui';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export interface Props extends RouteChildrenProps<{ id: string }> {}
}

// TODO - CONNECT EDIT

const mapList = (list: string[]) => list.map((item) => <li key={item}>{item}</li>);

const mapImages = (contributors: Contributors[]) => {
  if (contributors === null || contributors.length === 0) return;

  return contributors.map(({ name, avatar }) => (
    <li key={name}>
      <img src={avatar} />
    </li>
  ));
};

const TemplateDetails = ({ match }: TemplateDetails.Props) => {
  const { template, loading, getTemplate } = useTemplateDetailsProvider();

  useEffect(() => {
    getTemplate(match.params.id);
  }, [match.params.id]);

  return (
    <div className={csx.templateDetails}>
      <div className={csx.container}>
        {loading ? (
          <CircularProgress />
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
              <span className={csx.header}>
                <ul className={`${csx.basicList} ${csx.primary}`}>{mapList(template.tags)}</ul>
              </span>
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
                Created at {convertDate(template.createdDate)} by user
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
              <ul className={`${csx.basicList} ${csx.white}`}>{mapList(template.technologies)}</ul>
            </section>

            <section className={csx.col}>
              <h3 className={csx.header}>
                <span>Patterns</span>
              </h3>
              <ul className={`${csx.basicList} ${csx.white}`}>{mapList(template.patterns)}</ul>
            </section>

            <section className={csx.col}>
              <h3 className={csx.header}>
                <span>Authors</span>
              </h3>
              <ul className={csx.authors}>{mapImages(template.contributors)}</ul>
            </section>
          </>
        )}
        {/* {loading && <CircularProgress />}

        {!loading && (
         } */}
      </div>
    </div>
  );
};

export default (props: TemplateDetails.Props) => (
  <TemplateDetailsProvider>
    <TemplateDetails {...props} />
  </TemplateDetailsProvider>
);
