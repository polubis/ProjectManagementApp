import React from 'react';
import { render, screen } from '@testing-library/react';

import { _TEMPLATE_, _TECHNOLOGY_ } from 'testing/mocks';

import TemplateTileSmall from '../TemplateTileSmall';

describe('<TemplateTileSmall>', () => {
  it('assigns properties to container', () => {
    const { container } = render(
      <TemplateTileSmall className={'my-class'} template={_TEMPLATE_} />
    );

    expect(container.querySelector('.my-class')).toBeInTheDocument();
  });

  it('renders name', () => {
    render(<TemplateTileSmall template={_TEMPLATE_} />);

    expect(screen.getByText(_TEMPLATE_.name)).toBeInTheDocument();
  });

  it('renders technologies', () => {
    render(
      <TemplateTileSmall
        template={{
          ..._TEMPLATE_,
          technologies: [_TECHNOLOGY_, { ..._TECHNOLOGY_, id: 1 }],
        }}
      />
    );

    expect(screen.queryAllByAltText('Technology image').length).toBe(2);
  });
});
