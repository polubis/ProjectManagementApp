import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { postError } from '_mocks_';

import { Modal, Button } from 'ui';

export namespace ErrorBoundary {
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
    errors?: Error[];
  }
}

class ErrorBoundary extends Component<ErrorBoundary.Props, ErrorBoundary.State> {
  state: ErrorBoundary.State = {
    hasError: false,
    errors: []
  };

  static getDerivedStateFromError(): ErrorBoundary.State {
    return { hasError: true };
  }

  componentDidCatch({ name, message }: Error, { componentStack }: ErrorInfo) {
    const error: ErrorBoundary.Error = {
      name,
      message,
      componentStack,
      occuredAt: new Date()
    };

    const errorExists = this.state.errors
      .filter(
        ({ name, message, componentStack }) =>
          error.name === name &&
          error.message === message &&
          error.componentStack === componentStack
      )
      .pop();

    if (!errorExists) {
      this.setState({ ...this.state, errors: [...this.state.errors, error] });
      postError(error);
    }
  }

  handleRedirect = () => this.setState({ hasError: false });

  public render() {
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
