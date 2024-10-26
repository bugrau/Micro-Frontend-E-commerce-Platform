# Micro-Frontend E-commerce Platform

This project is a micro-frontend e-commerce platform consisting of several independent micro-frontends.

## Micro-frontends

1. Product Listings
2. Shopping Cart
3. User Authentication
4. Order History
5. Navigation (Container App)

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Running the Micro-frontends Locally

1. Clone the repository:
   ```
   git clone https://github.com/your-username/micro-frontend-e-commerce.git
   cd micro-frontend-e-commerce
   ```

2. Install dependencies for each micro-frontend:
   ```
   cd product-listings && npm install
   cd ../shopping-cart && npm install
   cd ../user-authentication && npm install
   cd ../order-history && npm install
   cd ../navigation && npm install
   ```

3. Start each micro-frontend in a separate terminal:

   Product Listings:
   ```
   cd product-listings
   npm start
   ```

   Shopping Cart:
   ```
   cd shopping-cart
   npm start
   ```

   User Authentication:
   ```
   cd user-authentication
   npm start
   ```

   Order History:
   ```
   cd order-history
   npm start
   ```

   Navigation (Container App):
   ```
   cd navigation
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Running Tests

To run tests for each micro-frontend:
