# Micro-Frontend E-commerce Platform

This project is a micro-frontend e-commerce platform built using Module Federation. It consists of several independent micro-frontends that work together to create a complete e-commerce experience.

## Architecture

The platform consists of the following micro-frontends:

1. **Navigation (Container App)** - Port 3005
   - Main container application
   - Handles routing and state management
   - Integrates all other micro-frontends

2. **Product Listings** - Port 3001
   - Displays product catalog
   - Handles product filtering and sorting
   - Manages product state

3. **Shopping Cart** - Port 3002
   - Manages cart functionality
   - Handles cart state
   - Provides cart operations (add, remove, update)

4. **User Authentication** - Port 3003
   - Handles user login/registration
   - Manages authentication state
   - Provides protected routes

5. **Order History** - Port 3004
   - Displays user orders
   - Manages order state
   - Handles order tracking

## Technologies Used

- React 18
- TypeScript
- Webpack 5 Module Federation
- Redux Toolkit
- Styled Components
- React Router v6
- Jest & React Testing Library

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/micro-frontend-e-commerce.git
   cd micro-frontend-e-commerce
   ```

2. Install dependencies for all micro-frontends:
   ```bash
   npm run setup
   ```

3. Start all micro-frontends:
   ```bash
   npm start
   ```

   This will start all micro-frontends on their respective ports:
   - Navigation: http://localhost:3005
   - Product Listings: http://localhost:3001
   - Shopping Cart: http://localhost:3002
   - User Authentication: http://localhost:3003
   - Order History: http://localhost:3004

## Development

To work on individual micro-frontends:

1. Navigate to the micro-frontend directory:
   ```bash
   cd [micro-frontend-name]
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Testing

Run tests for all micro-frontends:
```bash
npm test
```

Run tests for a specific micro-frontend:
```bash
cd [micro-frontend-name]
npm test
```

## Project Structure

```
micro-frontend-e-commerce/
├── navigation/             # Container application
├── product-listings/       # Product catalog
├── shopping-cart/         # Shopping cart functionality
├── user-authentication/   # User auth features
├── order-history/        # Order management
├── common/               # Shared components and utilities
└── package.json         # Root package.json for scripts
```

## Key Features

- Module Federation for micro-frontend architecture
- Shared dependencies between micro-frontends
- Centralized state management with Redux
- Type safety with TypeScript
- Styled Components for consistent styling
- Error Boundaries for graceful error handling
- Lazy loading of micro-frontends
- Hot Module Replacement (HMR)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

If you encounter any issues:

1. Ensure all ports (3001-3005) are available
2. Clear browser cache and local storage
3. Check if all micro-frontends are running
4. Verify that all dependencies are installed
5. Check console for error messages

## License

This project is licensed under the MIT License - see the LICENSE file for details