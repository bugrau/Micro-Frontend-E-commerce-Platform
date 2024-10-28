import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import styled from 'styled-components';
import { Order } from './orderSlice';

const OrderHistory: React.FC = () => {
  const { orders, isLoading } = useSelector((state: RootState) => state.orders);

  if (isLoading) {
    return <LoadingSpinner>Loading...</LoadingSpinner>;
  }

  if (!orders.length) {
    return (
      <Container>
        <Title>Order History</Title>
        <EmptyState>
          <EmptyIcon>📦</EmptyIcon>
          <EmptyTitle>No Orders Yet</EmptyTitle>
          <EmptyText>Your order history will appear here once you make a purchase.</EmptyText>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Order History</Title>
      <OrderList>
        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <OrderDate>{new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</OrderDate>
                <OrderId>Order #{order.id}</OrderId>
              </OrderInfo>
              <OrderStatus status={order.status}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </OrderStatus>
            </OrderHeader>
            <ItemList>
              {order.items.map((item) => (
                <OrderItem key={item.id}>
                  <ItemImageWrapper>
                    <ItemImage src={item.image} alt={item.name} />
                  </ItemImageWrapper>
                  <ItemContent>
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemMeta>
                        <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                        <ItemDot>•</ItemDot>
                        <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                      </ItemMeta>
                    </ItemDetails>
                    <ItemSubtotal>
                      ${(item.price * item.quantity).toFixed(2)}
                    </ItemSubtotal>
                  </ItemContent>
                </OrderItem>
              ))}
            </ItemList>
            <OrderFooter>
              <OrderSummary>
                <SummaryRow>
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Shipping</span>
                  <span>Free</span>
                </SummaryRow>
                <TotalRow>
                  <span>Total</span>
                  <TotalAmount>${order.total.toFixed(2)}</TotalAmount>
                </TotalRow>
              </OrderSummary>
              <OrderActions>
                <TrackButton>Track Order</TrackButton>
                <ViewDetailsButton>View Details</ViewDetailsButton>
              </OrderActions>
            </OrderFooter>
          </OrderCard>
        ))}
      </OrderList>
    </Container>
  );
};

// Updated styled components with modern design
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8fafc;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0f172a;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const OrderHeader = styled.div`
  padding: 1.5rem 2rem;
  background: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
`;

const OrderInfo = styled.div``;

const OrderDate = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.25rem;
`;

const OrderId = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${({ status }) => {
    switch (status) {
      case 'completed':
        return 'background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;';
      case 'pending':
        return 'background-color: #fefce8; color: #854d0e; border: 1px solid #fef08a;';
      case 'cancelled':
        return 'background-color: #fef2f2; color: #991b1b; border: 1px solid #fecaca;';
      default:
        return 'background-color: #f8fafc; color: #475569; border: 1px solid #e2e8f0;';
    }
  }}
`;

const ItemList = styled.div`
  padding: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #1a202c;
  margin-bottom: 0.25rem;
`;

const ItemQuantity = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #1a202c;
`;

const OrderFooter = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
`;

const OrderTotal = styled.div`
  text-align: right;
  font-size: 1.1rem;
  color: #1a202c;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  color: #1a202c;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #64748b;
  font-size: 1.1rem;
`;

const ItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemContent = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const ItemDot = styled.div`
  font-size: 0.875rem;
  margin: 0 0.25rem;
`;

const ItemSubtotal = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalAmount = styled.div`
  font-weight: 600;
  color: #1a202c;
`;

const OrderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const TrackButton = styled.button`
  background: #0f172a;
  color: #f8fafc;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  cursor: pointer;
`;

const ViewDetailsButton = styled.button`
  background: #0f172a;
  color: #f8fafc;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  cursor: pointer;
`;

export default OrderHistory;
