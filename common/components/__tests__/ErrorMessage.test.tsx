/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from '../ErrorMessage';

// Extend expect with jest-dom matchers
declare global {
  namespace jest {
    interface Expect {
      toBeInTheDocument(): void;
      toHaveClass(className: string): void;
      toHaveBeenCalledTimes(n: number): void;
    }
  }
}

describe('ErrorMessage', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  it('renders error message', () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('calls retryAction when retry button is clicked', () => {
    render(<ErrorMessage message="Error" retryAction={mockOnRetry} />);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('renders with custom className', () => {
    const customClass = 'custom-error';
    render(<ErrorMessage message="Error" className={customClass} />);
    expect(screen.getByTestId('error-container')).toHaveClass(customClass);
  });

  it('handles long error messages', () => {
    const longMessage = 'A'.repeat(100);
    render(<ErrorMessage message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('renders without retry button when retryAction is not provided', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
