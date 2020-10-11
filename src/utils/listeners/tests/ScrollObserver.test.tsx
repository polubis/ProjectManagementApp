import React, { useEffect, useState } from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import { ScrollObserver } from '..';

describe('ScrollObserver', () => {
  const _BOTTOM_LABEL = 'Bottom';

  const scrollWindow = (scrollY: number, innerHeight: number) => {
    fireEvent.scroll(window, { target: { scrollY, innerHeight } });
  };

  const ComponentStub = ({ offset = ScrollObserver.OFFSET, time = ScrollObserver.TIME }) => {
    const [position, setPosition] = useState<ScrollObserver.Position>(null);

    useEffect(() => {
      const sub = new ScrollObserver(window, setPosition, offset, time);

      return () => {
        sub.unsubscribe();
      };
    }, []);

    return <div>{position ? (position.bottom ? _BOTTOM_LABEL : '') : ''}</div>;
  };

  describe('detects when it reaches the bottom edge with', () => {
    const mockBodyOffsetHeight = (value: number) => {
      Object.defineProperty(document.body, 'offsetHeight', {
        writable: true,
        value
      });
    };

    beforeEach(() => {
      mockBodyOffsetHeight(3769);
    });

    afterEach(() => {
      mockBodyOffsetHeight(0);
    });

    it('default offset', async () => {
      render(<ComponentStub />);

      scrollWindow(2200, 939);
      scrollWindow(2200, 939);

      await waitFor(() => screen.getByText(_BOTTOM_LABEL));

      expect(screen.getByText(_BOTTOM_LABEL)).toBeInTheDocument();
    });

    it('custom offset', async () => {
      render(<ComponentStub offset={0} />);

      scrollWindow(2900, 939);
      scrollWindow(2900, 939);

      await waitFor(() => screen.getByText(_BOTTOM_LABEL));

      expect(screen.getByText(_BOTTOM_LABEL)).toBeInTheDocument();
    });
  });
});
