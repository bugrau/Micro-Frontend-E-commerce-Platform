describe('Product Listings Page', () => {
  beforeEach(() => {
    // Visit the product listings page before each test
    cy.visit('/')
  })

  it('displays the product list', () => {
    // Check if products are displayed
    cy.get('[data-testid="product-item"]').should('exist')
  })

  it('allows filtering products', () => {
    // Type into search/filter input
    cy.get('[data-testid="product-search"]').type('Product 1')
    
    // Check if filtered results are shown
    cy.get('[data-testid="product-item"]').should('have.length.at.least', 1)
  })

  it('can add product to cart', () => {
    // Click add to cart button on first product
    cy.get('[data-testid="add-to-cart-button"]').first().click()
    
    // Verify cart is updated
    cy.get('[data-testid="cart-count"]').should('have.text', '1')
  })
})
