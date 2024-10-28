import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { 

  fetchProducts, 

  selectFilteredProducts,

  setFilter,

  clearFilters,

} from './productSlice';

import { shoppingCartActions } from 'shopping-cart/cartSlice';

import type { AppDispatch } from './store';

import './ProductListings.css';



const ProductListings: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectFilteredProducts);

  const status = useSelector((state: any) => state.products.status);

  const error = useSelector((state: any) => state.products.error);

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Add type for sort options
  type SortOption = 'price-asc' | 'price-desc' | 'name' | null;

  const handleSortChange = (value: string) => {
    let sortValue: SortOption = null;
    
    switch (value) {
      case 'price-asc':
      case 'price-desc':
      case 'name':
        sortValue = value;
        break;
      default:
        sortValue = null;
    }
    
    dispatch(setFilter({ sortBy: sortValue }));
  };





  useEffect(() => {

    if (status === 'idle') {

      dispatch(fetchProducts());

    }

  }, [status, dispatch]);



  const handlePriceRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilter({
      minPrice: priceRange.min ? Number(priceRange.min) : null,
      maxPrice: priceRange.max ? Number(priceRange.max) : null
    }));
  };



  if (status === 'loading') {

    return <LoadingSpinner>Loading products...</LoadingSpinner>;

  }



  if (status === 'failed') {

    return <ErrorMessage>Error: {error}</ErrorMessage>;

  }



  return (
    <Container>
      <Header>
        <Title>Product Listings</Title>
        <FilterSection>
          <FilterGroup>
            <Label>Category</Label>
            <StyledSelect onChange={(e) => dispatch(setFilter({ category: e.target.value || null }))}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </StyledSelect>
          </FilterGroup>

          <FilterGroup>
            <Label>Sort By</Label>
            <StyledSelect onChange={(e) => handleSortChange(e.target.value)}>
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </StyledSelect>
          </FilterGroup>

          <PriceFilterForm onSubmit={handlePriceRangeSubmit}>
            <PriceInput
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            />
            <PriceInput
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            />
            <ActionButton type="submit">Apply Filter</ActionButton>
          </PriceFilterForm>

          <ActionButton 
            onClick={() => {
              dispatch(clearFilters());
              setPriceRange({ min: '', max: '' });
            }}
            variant="secondary"
          >
            Clear Filters
          </ActionButton>
        </FilterSection>
      </Header>

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ImageContainer>
              <ProductImage src={product.imageUrl} alt={product.name} />
              {product.stock === 0 && <OutOfStockBadge>Out of Stock</OutOfStockBadge>}
            </ImageContainer>
            <ProductInfo>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <PriceRow>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <StockInfo>Stock: {product.stock}</StockInfo>
              </PriceRow>
              <AddToCartButton 
                onClick={() => dispatch(shoppingCartActions.addToCart(product))}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );

};

// Modern styled components
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a202c;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const StyledSelect = styled.select`
  padding: 0.625rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #2d3748;
  font-size: 0.875rem;
  min-width: 160px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const OutOfStockBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductCategory = styled.div`
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  color: #1a202c;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
`;

const StockInfo = styled.div`
  font-size: 0.875rem;
  color: #718096;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  background-color: ${props => props.variant === 'secondary' ? '#718096' : '#4299e1'};
  color: white;

  &:hover {
    background-color: ${props => props.variant === 'secondary' ? '#4a5568' : '#3182ce'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AddToCartButton = styled(ActionButton)`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  
  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
    
    &:hover {
      background-color: #cbd5e0;
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

const PriceFilterForm = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
`;

// Add ErrorMessage styled component
const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  background-color: #fde8e8;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export default ProductListings;
