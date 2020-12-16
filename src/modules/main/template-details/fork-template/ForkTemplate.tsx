import React, { useState, useCallback, useEffect } from 'react';

import { Modal, Loader, Button, Disclaimer } from 'ui';

import { Template } from 'shared/models';
import { forkTemplate } from 'shared/services';

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

const ForkTemplate = ({ template, onClose }: ForkTemplate.Props): JSX.Element => {
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
    <Modal className={csx.forkTemplate} onClose={pending ? undefined : onClose}>
      {pending ? (
        <Loader />
      ) : error ? (
        <>
          <Disclaimer
            description="Something went wrong while forking the template. Please try again later"
            title={<span className={csx.error}>Error occured</span>}
          />

          <footer>
            <Button disabled={pending} theme="primaryTransparent" onClick={onClose}>
              CLOSE
            </Button>
            <Button className={csx.retryBtn} disabled={pending} onClick={handleForkTemplate}>
              RETRY
            </Button>
          </footer>
        </>
      ) : (
        success && (
          <>
            <Disclaimer
              description="This window can be closed"
              title={
                <>
                  Template <span className={csx.primary}>{template.name}</span> has been{' '}
                  <span className={csx.success}>forked</span> !
                </>
              }
            />

            <footer>
              <Button disabled={pending} onClick={onClose}>
                CONFIRM
              </Button>
            </footer>
          </>
        )
      )}
    </Modal>
  );
};

export default ForkTemplate;
