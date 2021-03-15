import { useState, useEffect } from 'react';
import { from } from 'rxjs';

import { Template } from 'shared/models';
import { markLastAddedReadTime } from 'shared/services';

export const useMarkLastAddedReadTime = (
  authorized: boolean,
  templates: Template[] | null
): void => {
  const [alreadyMarked, setAlreadyMarked] = useState(false);

  useEffect(() => {
    if (authorized && templates && templates.length > 0 && !alreadyMarked) {
      const sub = from(markLastAddedReadTime()).subscribe(() => {
        setAlreadyMarked(true);
      });

      return () => {
        sub.unsubscribe();
      };
    }
  }, [authorized, templates, alreadyMarked]);
};
