import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { clearNotification } from '../cartSlice';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.cart.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <NotificationContainer $type={notification.type}>
      <Message>{notification.message}</Message>
    </NotificationContainer>
  );
};

const NotificationContainer = styled.div<{ $type: 'success' | 'error' | null }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  background-color: ${props => 
    props.$type === 'success' ? '#4caf50' : 
    props.$type === 'error' ? '#f44336' : 
    '#2196f3'};
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
`;

export default Notification;
