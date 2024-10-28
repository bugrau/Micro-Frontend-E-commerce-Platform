import React from 'react';
import styled from 'styled-components';

const FallbackError: React.FC = () => (
  <ErrorContainer>
    <ErrorMessage>
      Failed to load module. Please try refreshing the page.
    </ErrorMessage>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default FallbackError; 