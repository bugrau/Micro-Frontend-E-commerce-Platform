import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { login, registerUser, logout, clearError } from './authSlice';

import type { RootState } from './store';

import type { AppDispatch } from './store';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';



// Define form input types

interface FormInputs {

  name?: string;

  email: string;

  password: string;

}



const UserAuthentication: React.FC = () => {

  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated, user } = useSelector(

    (state: RootState) => state.auth

  );



  // Create validation schema

  const validationSchema = yup.object().shape({

    name: yup.string().when('$mode', {

      is: (mode: string) => mode === 'register',

      then: (schema) => schema.required('Name is required').min(2, 'Name must be at least 2 characters'),

      otherwise: (schema) => schema.optional()

    }),

    email: yup.string().required('Email is required').email('Invalid email format'),

    password: yup.string()

      .required('Password is required')

      .min(8, 'Password must be at least 8 characters')

      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')

      .matches(/[0-9]/, 'Password must contain at least one number')

  });



  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({

    resolver: yupResolver(validationSchema),

    context: { mode: isLogin ? 'login' : 'register' }

  });



  useEffect(() => {

    reset();

  }, [isLogin, reset]);



  const onSubmit = handleSubmit(async (data: FormInputs) => {

    try {

      if (isLogin) {

        await dispatch(login({ email: data.email, password: data.password }));

      } else {

        if (!data.name) return;

        await dispatch(registerUser({ 

          email: data.email, 

          password: data.password, 

          name: data.name 

        }));

      }

    } catch (error) {

      console.error('Authentication error:', error);

    }

  });



  if (isAuthenticated && user) {

    return (

      <Container>

        <AuthCard>

          <WelcomeSection>

            <Avatar>{user.name[0].toUpperCase()}</Avatar>

            <WelcomeTitle>Welcome back, {user.name}!</WelcomeTitle>

            <UserEmail>{user.email}</UserEmail>

            <LogoutButton onClick={() => dispatch(logout())}>Sign Out</LogoutButton>

          </WelcomeSection>

        </AuthCard>

      </Container>

    );

  }



  return (

    <Container>

      <AuthCard>

        <FormTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</FormTitle>

        <FormSubtitle>

          {isLogin 

            ? 'Please sign in to continue' 

            : 'Fill in your details to get started'}

        </FormSubtitle>

        

        <Form onSubmit={onSubmit}>

          {!isLogin && (

            <FormGroup>

              <Label>Name</Label>

              <Input

                type="text"

                placeholder="Enter your name"

                {...register('name')}

                error={errors.name?.message}

              />

              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

            </FormGroup>

          )}

          

          <FormGroup>

            <Label>Email</Label>

            <Input

              type="email"

              placeholder="Enter your email"

              {...register('email')}

              error={errors.email?.message}

            />

            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          </FormGroup>

          

          <FormGroup>

            <Label>Password</Label>

            <Input

              type="password"

              placeholder="Enter your password"

              {...register('password')}

              error={errors.password?.message}

            />

            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          </FormGroup>



          {error && <GlobalError>{error}</GlobalError>}

          

          <SubmitButton type="submit" disabled={loading}>

            {loading ? (

              <LoadingSpinner />

            ) : (

              isLogin ? 'Sign In' : 'Create Account'

            )}

          </SubmitButton>

        </Form>



        <Divider>or</Divider>

        

        <ToggleText>

          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <ToggleButton

            type="button"

            onClick={() => {

              setIsLogin(!isLogin);

              dispatch(clearError());

            }}

          >

            {isLogin ? 'Sign Up' : 'Sign In'}

          </ToggleButton>

        </ToggleText>

      </AuthCard>

    </Container>

  );

};



// Styled components

const Container = styled.div`

  display: flex;

  justify-content: center;

  align-items: center;

  min-height: 100vh;

  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  padding: 20px;

`;



const AuthCard = styled.div`

  width: 100%;

  max-width: 400px;

  background: white;

  border-radius: 20px;

  padding: 40px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

`;



const FormTitle = styled.h1`

  font-size: 24px;

  color: #1a202c;

  text-align: center;

  margin-bottom: 8px;

`;



const FormSubtitle = styled.p`

  font-size: 14px;

  color: #718096;

  text-align: center;

  margin-bottom: 32px;

`;



const Form = styled.form`

  display: flex;

  flex-direction: column;

  gap: 20px;

`;



const FormGroup = styled.div`

  display: flex;

  flex-direction: column;

  gap: 6px;

`;



const Label = styled.label`

  font-size: 14px;

  font-weight: 500;

  color: #4a5568;

`;



const Input = styled.input<{ error?: string }>`

  padding: 12px 16px;

  border: 1px solid ${props => props.error ? '#e53e3e' : '#e2e8f0'};

  border-radius: 8px;

  font-size: 14px;

  transition: all 0.2s;



  &:focus {

    outline: none;

    border-color: #4299e1;

    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);

  }

`;



const ErrorText = styled.span`

  font-size: 12px;

  color: #e53e3e;

`;



const GlobalError = styled.div`

  padding: 12px;

  background-color: #fff5f5;

  border: 1px solid #feb2b2;

  border-radius: 8px;

  color: #c53030;

  font-size: 14px;

  text-align: center;

`;



const SubmitButton = styled.button`

  padding: 12px;

  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);

  color: white;

  border: none;

  border-radius: 8px;

  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s;



  &:hover:not(:disabled) {

    transform: translateY(-1px);

    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.25);

  }



  &:disabled {

    opacity: 0.7;

    cursor: not-allowed;

  }

`;



const Divider = styled.div`

  display: flex;

  align-items: center;

  text-align: center;

  margin: 24px 0;

  color: #a0aec0;

  font-size: 14px;



  &::before,

  &::after {

    content: '';

    flex: 1;

    border-bottom: 1px solid #e2e8f0;

  }



  &::before {

    margin-right: 16px;

  }



  &::after {

    margin-left: 16px;

  }

`;



const ToggleText = styled.p`

  text-align: center;

  color: #4a5568;

  font-size: 14px;

`;



const ToggleButton = styled.button`

  background: none;

  border: none;

  color: #4299e1;

  font-weight: 600;

  margin-left: 4px;

  cursor: pointer;

  transition: color 0.2s;



  &:hover {

    color: #2b6cb0;

  }

`;



const WelcomeSection = styled.div`

  text-align: center;

`;



const Avatar = styled.div`

  width: 80px;

  height: 80px;

  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  font-size: 32px;

  font-weight: 600;

  margin: 0 auto 20px;

`;



const WelcomeTitle = styled.h2`

  font-size: 24px;

  color: #1a202c;

  margin-bottom: 8px;

`;



const UserEmail = styled.p`

  color: #718096;

  margin-bottom: 24px;

`;



const LogoutButton = styled(SubmitButton)`

  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);

  width: 100%;



  &:hover:not(:disabled) {

    box-shadow: 0 4px 12px rgba(229, 62, 62, 0.25);

  }

`;



const LoadingSpinner = styled.div`

  width: 20px;

  height: 20px;

  border: 2px solid #ffffff;

  border-top-color: transparent;

  border-radius: 50%;

  margin: 0 auto;

  animation: spin 0.8s linear infinite;



  @keyframes spin {

    to {

      transform: rotate(360deg);

    }

  }

`;



export default UserAuthentication;
