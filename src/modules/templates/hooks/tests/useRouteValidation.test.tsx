import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, Route, useRouteMatch } from 'react-router';
import { render, screen } from '@testing-library/react';

import { TemplateCategory } from 'core/api';

import { TemplatesRouteProps, CATEGORIES } from '../..';

import { useRouteValidation } from '..';

describe('useRouteValidation', () => {
  const _INVALID_URL_ = '/app/templates/recomm';
  const _VALID_URLS_ = CATEGORIES.map((category) => `/app/templates/${category}`);

  const ComponentStub = () => {
    const {
      params: { category }
    } = useRouteMatch<TemplatesRouteProps>();

    useRouteValidation();

    return (
      <>
        <div>{category}</div>
      </>
    );
  };

  it('stays on route for valid category', () => {
    _VALID_URLS_.forEach((url, idx) => {
      const history = createMemoryHistory();

      history.push(url);

      render(
        <Router history={history}>
          <Route path={'/app/templates/:category'} component={ComponentStub} />
        </Router>
      );

      expect(screen.getByText(CATEGORIES[idx])).toBeInTheDocument();
    });
  });

  it(`redirects for invalid category to ${TemplateCategory.ALL}`, () => {
    const history = createMemoryHistory();

    history.push(_INVALID_URL_);

    render(
      <Router history={history}>
        <Route path={'/app/templates/:category'} component={ComponentStub} />
      </Router>
    );

    expect(screen.getByText(TemplateCategory.ALL)).toBeInTheDocument();
  });
});
