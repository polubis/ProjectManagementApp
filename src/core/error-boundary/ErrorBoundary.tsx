import React, { Component, ErrorInfo, ReactNode } from 'react';

import { Modal, Button } from 'ui';

namespace ErrorBoundary {
  export interface Props {
    children: ReactNode;
  }

  export interface Error {
    name: string;
    message: string;
    componentStack: string;
    occuredAt: Date;
  }

  export interface State {
    hasError: boolean;
  }
}

const STATE: ErrorBoundary.State = {
  hasError: false,
};

class ErrorBoundary extends Component<ErrorBoundary.Props, typeof STATE> {
  state = STATE;

  readonly errors: ErrorBoundary.Error[] = [];

  static getDerivedStateFromError(): ErrorBoundary.State {
    return { hasError: true };
  }

  componentDidCatch({ name, message }: Error, { componentStack }: ErrorInfo) {
    const error: ErrorBoundary.Error = {
      name,
      message,
      componentStack,
      occuredAt: new Date(),
    };

    this.errors.push(error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal>
          <h5>Oops, something went wrong.</h5>
          <Button onClick={this.handleReload}>RELOAD</Button>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
