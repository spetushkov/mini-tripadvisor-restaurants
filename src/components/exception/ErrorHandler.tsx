import React from 'react';
import { Logger } from '../../log/Logger';
import { AppError } from './AppError';

type Props = {
  children: React.ReactNode;
};

type State = {
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export class ErrorHandler extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    Logger.log(JSON.stringify({ error, errorInfo }));

    this.setState({ errorInfo });
  }

  render(): React.ReactNode {
    if (!this.state) {
      return this.props.children;
    }

    const { error, errorInfo } = this.state;
    if (!error) {
      return this.props.children;
    }

    return <AppError error={error} errorInfo={errorInfo} />;
  }
}
