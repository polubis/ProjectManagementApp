import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';

import { Button } from 'ui';

import csx from './TemplateDetails.scss';
import { Template, getTemplateDetails } from 'api';

interface TemplateDetailsProps extends RouteChildrenProps<{ id: string }> {}

// TODO - REPLACE MISSING PROPERTIES WHEN ENDPOINT WILL BE FINISHED
// TODO - CONNECT EDIT

const TemplateDetails = ({ match }: TemplateDetailsProps) => {
  const MOCKED_TECH_STACK = ['React', 'Angular', 'Vue'];
  const MOCKED_AUTHORS = [
    'https://dummyimage.com/64x64/000/fff.png',
    'https://dummyimage.com/64x64/000/fff.png',
    'https://dummyimage.com/64x64/000/fff.png'
  ];

  const [template, setTemplate] = useState<Template>(null);

  const mapList = (list: string[]) => list.map((item) => <li key={item}>{item}</li>);
  const mapImages = (list: string[]) =>
    // to avoid key error
    list.map((item, idx) => (
      <li key={item + idx}>
        <img src={item} />
      </li>
    ));

  useEffect(() => {
    const getData = async () => {
      const template = await getTemplateDetails(match.params.id);
      setTemplate(template);
    };

    getData();
  }, [match.params.id]);

  if (template === null) return <div>Loading...</div>;
  return (
    <div className={csx.templateDetails}>
      <div className={csx.container}>
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
            <ul className={[csx.basicList, csx.primary].join(' ')}>
              {mapList(template.technologies)}
            </ul>
          </span>
        </section>

        <section className={csx.details}>
          <span className={csx.watches}>
            <VisibilityIcon />
            {template.views}
          </span>
          <span className={csx.stars}>
            <StarBorderIcon />
            {template.stars}
          </span>
          {/* MISSING FROM API? */}
          <p className={csx.createdBy}>Created 12 months ago by user</p>
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
          {/* MISSING FROM API? */}
          <ul className={[csx.basicList, csx.white].join(' ')}>{mapList(MOCKED_TECH_STACK)}</ul>
        </section>

        <section className={csx.col}>
          <h3 className={csx.header}>
            <span>Patterns</span>
          </h3>
          <ul className={[csx.basicList, csx.white].join(' ')}>{mapList(template.patterns)}</ul>
        </section>

        <section className={csx.col}>
          <h3 className={csx.header}>
            <span>Authors</span>
          </h3>
          {/* MISSING FROM API? */}
          <ul style={{ display: 'inline-flex' }}>{mapImages(MOCKED_AUTHORS)}</ul>
        </section>
      </div>
    </div>
  );
};

export default TemplateDetails;
