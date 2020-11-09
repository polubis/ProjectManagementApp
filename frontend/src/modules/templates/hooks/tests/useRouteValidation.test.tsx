import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, Route, useRouteMatch } from 'react-router';
import { render, screen } from '@testing-library/react';

import { TemplateCategory } from 'core/api';

import { TemplatesRouteProps } from '../..';

import { useRouteValidation } from '..';

describe('useRouteValidation', () => {
  const _INVALID_URL_ = '/app/templates/recomm';

  const ComponentStub = () => {
    const {
      params: { category }
    } = useRouteMatch<TemplatesRouteProps>();

    useRouteValidation();

    return <div>{category}</div>;
  };

  it('redirects for invalid category', () => {
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
