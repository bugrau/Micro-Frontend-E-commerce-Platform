import React from 'react';
import styled from 'styled-components';
import './ErrorMessage.css';

export interface ErrorMessageProps {
  message: string;
  retryAction?: () => void;
  className?: string;
}

const ErrorContainer = styled.div`
  // ... existing styles ...
`;

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retryAction, className }) => {
  return (
    <ErrorContainer data-testid="error-container" className={className}>
      <p>{message}</p>
      {retryAction && (
        <button onClick={retryAction}>Retry</button>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;
