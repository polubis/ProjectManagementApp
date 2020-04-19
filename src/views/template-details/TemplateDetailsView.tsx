import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShareIcon from '@material-ui/icons/Share';

import { Button } from 'shared/ui';

import csx from './TemplateDetailsView.scss';

interface TemplateDetailsViewProps extends RouteChildrenProps<{ id: string }> {}

const TemplateDetailsView = ({ match }: TemplateDetailsViewProps) => {
  const MOCKED_TECH = ['PWA', 'React', 'JavaScript', 'TypeScript', 'MVP'];
  const MOCKED_PATTERNS = ['PWA', 'MVP'];
  const MOCKED_TECH_STACK = ['React', 'Angular', 'Vue'];
  const MOCKED_AUTHORS = [
    'https://dummyimage.com/64x64/000/fff.png',
    'https://dummyimage.com/64x64/000/fff.png',
    'https://dummyimage.com/64x64/000/fff.png'
  ];

  const mapList = (list: string[]) => list.map((item) => <li key={item}>{item}</li>);
  const mapImages = (list: string[]) =>
    list.map((item) => (
      <li key={item}>
        <img src={item} />
      </li>
    ));

  useEffect(() => {
    console.log(match);
    console.log(`callApi with id ${match.params.id}`);
  }, [match.params.id]);
  
  return (
    <div className={csx.templateDetailsView}>
      <div className={csx.container}>
        <div className={csx.actions}>
          <NavLink to={`${match.url}/documentation`}>
            <Button>
              <MenuBookIcon /> DOCS
            </Button>
          </NavLink>

          <Button>
            <ShareIcon /> SOURCE
          </Button>
        </div>

        <section>
          <span className={csx.header}>
            <Button variant="icon" className={csx.button}>
              <EditIcon />
            </Button>
            <ul className={[csx.basicList, csx.primary].join(' ')}>{mapList(MOCKED_TECH)}</ul>
          </span>
        </section>

        <section className={csx.details}>
          <span className={csx.watches}>
            <VisibilityIcon />
            13k watch
          </span>
          <span className={csx.stars}>
            <StarBorderIcon />
            3.5k stars
          </span>
          <p className={csx.createdBy}>Created 12 months ago by user</p>
        </section>

        <section>
          <h2 className={csx.header}>
            <Button variant="icon" className={csx.button}>
              <EditIcon />
            </Button>
            <span>React with model view provider</span>
          </h2>

          <p className={csx.description}>
            CSS uses a global namespace for CSS Selectors that can easily result in style conflicts
            throughout your application when building an application using modern web components.
            You can avoid this problem by nesting CSS selectors or use a styling convention like BEM
            but this becomes complicated quickly and won’t scale. CSS-in-JS avoids these problems
            entirely by generating unique class names when styles are converted to CSS. This allows
            you to think about styles on a component level with out worrying about styles defined
            elsewhere.
          </p>
        </section>

        <section className={csx.col}>
          <h3 className={csx.header}>
            <Button variant="icon" className={csx.button}>
              <EditIcon />
            </Button>
            <span>Tech stack</span>
          </h3>
          <ul className={[csx.basicList, csx.white].join(' ')}>{mapList(MOCKED_TECH_STACK)}</ul>
        </section>

        <section className={csx.col}>
          <h3 className={csx.header}>
            <Button variant="icon" className={csx.button}>
              <EditIcon />
            </Button>
            <span>Patterns</span>
          </h3>
          <ul className={[csx.basicList, csx.white].join(' ')}>{mapList(MOCKED_PATTERNS)}</ul>
        </section>

        <section className={csx.col}>
          <h3 className={csx.header}>
            <Button variant="icon" className={csx.button}>
              <EditIcon />
            </Button>
            <span>Authors</span>
          </h3>
          <ul style={{ display: 'inline-flex' }}>{mapImages(MOCKED_AUTHORS)}</ul>
        </section>
      </div>
    </div>
  );
};

export default TemplateDetailsView;
