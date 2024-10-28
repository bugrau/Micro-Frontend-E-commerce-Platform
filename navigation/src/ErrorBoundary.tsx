import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent>
            <ErrorTitle>Something went wrong</ErrorTitle>
            <ErrorMessage>
              {this.state.error && this.state.error.toString()}
            </ErrorMessage>
            {this.state.errorInfo && (
              <ErrorStack>
                {this.state.errorInfo.componentStack}
              </ErrorStack>
            )}
            <RetryButton onClick={this.handleRetry}>
              Retry
            </RetryButton>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorContent = styled.div`
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #dc2626;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #4b5563;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 4px;
`;

const ErrorStack = styled.pre`
  text-align: left;
  font-size: 0.875rem;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

export default ErrorBoundary;
