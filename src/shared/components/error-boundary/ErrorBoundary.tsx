import React, { Component, ErrorInfo, ReactNode, ComponentType } from 'react';

namespace ErrorBoundary {
  export interface Props {
    children: ReactNode;
    fallback: ComponentType<unknown>;
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

  componentDidCatch({ name, message }: Error, { componentStack }: ErrorInfo): void {
    const error: ErrorBoundary.Error = {
      name,
      message,
      componentStack,
      occuredAt: new Date(),
    };

    this.errors.push(error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;

      return <Fallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
