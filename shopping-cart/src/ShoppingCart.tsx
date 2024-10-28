import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shoppingCartActions } from './cartSlice';
import styled from 'styled-components';
import Notification from './components/Notification';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  quantity: number;
}

interface RootState {
  cart: {
    items: CartItem[];
    loading: boolean;
    error: string | null;
  };
}

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);

  const total = items.reduce((sum: number, item: CartItem) => 
    sum + item.price * item.quantity, 0
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, item: CartItem) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0 && quantity <= item.stock) {
      dispatch(shoppingCartActions.updateQuantity({ id: item.id, quantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(shoppingCartActions.removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(shoppingCartActions.clearCart());
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading cart...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container>
        <EmptyCartMessage>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyText>Your cart is empty</EmptyText>
          <EmptySubtext>Add some items to get started!</EmptySubtext>
        </EmptyCartMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Notification />
      <Header>
        <Title>Shopping Cart</Title>
        <ItemCount>{items.length} {items.length === 1 ? 'item' : 'items'}</ItemCount>
      </Header>
      <CartList>
        {items.map((item: CartItem) => (
          <CartItemCard key={item.id} data-testid={`cart-item-${item.id}`}>
            <ItemImageContainer>
              <ItemImage src={item.imageUrl} alt={item.name} />
            </ItemImageContainer>
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemCategory>{item.category}</ItemCategory>
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
            </ItemDetails>
            <ItemControls>
              <QuantityControl>
                <QuantityLabel>Quantity:</QuantityLabel>
                <QuantityInput
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item)}
                />
                <StockInfo>({item.stock} available)</StockInfo>
              </QuantityControl>
              <ItemSubtotal>
                ${(item.price * item.quantity).toFixed(2)}
              </ItemSubtotal>
              <RemoveButton 
                onClick={() => handleRemoveItem(item.id)}
                title="Remove from cart"
              >
                ×
              </RemoveButton>
            </ItemControls>
          </CartItemCard>
        ))}
      </CartList>
      <CartSummary>
        <SummaryDetails>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping:</span>
            <span>Free</span>
          </SummaryRow>
          <TotalRow>
            <span>Total:</span>
            <TotalAmount data-testid="cart-total">${total.toFixed(2)}</TotalAmount>
          </TotalRow>
        </SummaryDetails>
        <ActionButtons>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
          <ClearButton 
            onClick={handleClearCart}
            data-testid="clear-cart-button"
          >
            Clear Cart
          </ClearButton>
        </ActionButtons>
      </CartSummary>
    </Container>
  );
};

// Modern styled components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a202c;
  font-weight: 700;
`;

const ItemCount = styled.span`
  color: #64748b;
  font-size: 1.1rem;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ItemImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  color: #1a202c;
  font-weight: 600;
  margin: 0;
`;

const ItemCategory = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ItemPrice = styled.div`
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 600;
`;

const ItemControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  min-width: 120px;
`;

const QuantityControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const QuantityLabel = styled.label`
  font-size: 0.875rem;
  color: #64748b;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const StockInfo = styled.span`
  font-size: 0.75rem;
  color: #64748b;
`;

const ItemSubtotal = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
`;

const RemoveButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #ef4444;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #dc2626;
    transform: scale(1.1);
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 1rem;
  margin-top: 1rem;
`;

const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 1rem;
`;

const TotalRow = styled(SummaryRow)`
  border-top: 2px solid #e2e8f0;
  padding-top: 1rem;
  font-weight: 600;
  color: #1a202c;
  font-size: 1.25rem;
`;

const TotalAmount = styled.span`
  color: #2563eb;
  font-size: 1.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CheckoutButton = styled.button`
  flex: 2;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ClearButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background-color: #64748b;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #475569;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  margin: 2rem 0;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.h2`
  color: #1a202c;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

export default ShoppingCart;
