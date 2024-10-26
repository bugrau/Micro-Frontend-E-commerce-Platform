import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { login, register, logout, clearError } from './authSlice';
import styled from 'styled-components';

const UserAuthentication: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user, error, isLoading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    dispatch(register({ email: registerEmail, password: registerPassword }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFormClick = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  if (user) {
    return (
      <Container>
        <h2>Welcome, {user.email}</h2>
        <Button data-testid="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2>User Authentication</h2>
      {(error || formError) && (
        <ErrorContainer data-testid="form-error">
          <p>{error || formError}</p>
          {error && (
            <Button onClick={() => dispatch(clearError())}>
              Try Again
            </Button>
          )}
        </ErrorContainer>
      )}
      
      <Form data-testid="login-form" onSubmit={handleLogin} onClick={handleFormClick}>
        <h3>Login</h3>
        <Input
          data-testid="login-email"
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <PasswordContainer>
          <Input
            data-testid="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            disabled={isLoading}
            required
          />
          <Button
            type="button"
            data-testid="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </Button>
        </PasswordContainer>
        {showPasswordRequirements && (
          <Requirements data-testid="password-requirements">
            Password must contain at least 8 characters, including numbers and special characters
          </Requirements>
        )}
        <Button
          type="submit"
          data-testid="login-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner data-testid="login-spinner" aria-label="Loading" />
          ) : (
            'Login'
          )}
        </Button>
      </Form>

      <Form data-testid="register-form" onSubmit={handleRegister} onClick={handleFormClick}>
        <h3>Register</h3>
        <Input
          data-testid="register-email"
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          data-testid="register-password"
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <Button
          type="submit"
          data-testid="register-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner data-testid="register-spinner" aria-label="Loading" />
          ) : (
            'Register'
          )}
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Requirements = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: -5px;
`;

const ErrorContainer = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default UserAuthentication;
