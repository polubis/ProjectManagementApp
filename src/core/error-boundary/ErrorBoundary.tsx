import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

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

const mockPostError = async (error: ErrorBoundary.Error): Promise<ErrorBoundary.Error> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(error);
    }, 300)
  );
};

class ErrorBoundary extends Component<ErrorBoundary.Props, ErrorBoundary.State> {
  state: ErrorBoundary.State = {
    hasError: false
  };

  readonly errors: ErrorBoundary.Error[] = [];

  static getDerivedStateFromError(): ErrorBoundary.State {
    return { hasError: true };
  }

  async componentDidCatch({ name, message }: Error, { componentStack }: ErrorInfo) {
    const error: ErrorBoundary.Error = {
      name,
      message,
      componentStack,
      occuredAt: new Date()
    };

    this.errors.push(error);

    console.log(await mockPostError(error));
  }

  private handleRedirect = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <Modal>
          <h5>Oops, something went wrong.</h5>
          <Link to="/app">
            <Button onClick={this.handleRedirect}>REDIRECT</Button>
          </Link>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
