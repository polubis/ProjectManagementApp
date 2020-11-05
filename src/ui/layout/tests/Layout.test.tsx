import React from 'react';
import { render, screen } from '@testing-library/react';

import { Layout } from '..';

describe('<Layout>', () => {
  it('shows children', () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('adds className', () => {
    const { container } = render(
      <Layout className="foo">
        <div>Test</div>
      </Layout>
    );
    expect(container.firstChild).toHaveClass('foo');
  });
});
