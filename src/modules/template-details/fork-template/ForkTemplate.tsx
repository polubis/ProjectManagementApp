import React, { useState, useCallback, useEffect } from 'react';

import { Modal, Loader, Button } from 'ui';

import { forkTemplate, Template } from 'core/api';

import csx from './ForkTemplate.scss';

export namespace ForkTemplate {
  export interface Props {
    template: Template;
    onClose(): void;
  }
}

interface State {
  error: boolean;
  pending: boolean;
  success: boolean;
}

const STATE: State = {
  error: false,
  pending: true,
  success: false,
};

const ForkTemplate = ({ template, onClose }: ForkTemplate.Props) => {
  const [state, setState] = useState<State>(STATE);

  const { error, pending, success } = state;

  const handleForkTemplate = useCallback(async (): Promise<void> => {
    if (!pending) {
      setState(STATE);
    }

    try {
      await forkTemplate({ templateId: template.id });

      setState({ error: false, pending: false, success: true });
    } catch {
      setState({ error: true, pending: false, success: false });
    }
  }, [pending]);

  useEffect(() => {
    handleForkTemplate();
  }, []);

  return (
    <Modal className={csx.forkTemplate}>
      {pending ? (
        <Loader />
      ) : error ? (
        <>
          <h3 className={csx.error}>Error occured</h3>

          <span>
            Something went wrong while forking the template. Please try again
            later.
          </span>

          <footer>
            <Button
              disabled={pending}
              theme="primaryTransparent"
              onClick={onClose}
            >
              CLOSE
            </Button>
            <Button
              className={csx.retryBtn}
              disabled={pending}
              onClick={handleForkTemplate}
            >
              RETRY
            </Button>
          </footer>
        </>
      ) : (
        success && (
          <>
            <h3>
              Template <span>{template.name}</span> has been{' '}
              <span className={csx.success}>forked</span> !
            </h3>

            <span>This window can be closed</span>

            <footer>
              <Button disabled={pending} onClick={onClose}>
                OK
              </Button>
            </footer>
          </>
        )
      )}
    </Modal>
  );
};

export default ForkTemplate;
