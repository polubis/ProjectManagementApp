import React from 'react';
import { render, screen } from '@testing-library/react';

import Displayer from '../Displayer';

describe('<Displayer />', () => {
  const testDisclaimer = (text: string, props: Omit<Displayer.Props, 'children'>): void => {
    render(
      <Displayer {...props}>
        {() => <div>loading</div>}
        {() => <div>empty</div>}
        {() => <div>data</div>}
        {() => <div>error</div>}
      </Displayer>
    );

    expect(screen.getByText(new RegExp(text.toLowerCase()))).toBeInTheDocument();
  };

  it('shows loading component when loading truthy', () => {
    testDisclaimer('loading', { loading: true });
  });

  it('shows empty component when empty truthy', () => {
    testDisclaimer('empty', { empty: true });
  });

  it('shows error component when error truthy', () => {
    testDisclaimer('error', { error: true });
  });

  it('shows data component for other cases', () => {
    testDisclaimer('data', {});
  });
});
