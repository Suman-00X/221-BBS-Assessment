# Hoodie shop

## Features

- User authentication: Users can sign up and log in to access the application.
- Profile management: Users can update their profile information such as username, email, address, and phone number.
- Product management: Admin users can add, modify, and delete products.
- Product browsing: Users can browse through the available products and view details of each product.
- Order history: Users can view their order history to track their previous purchases.

## Technologies Used

- Frontend:
  - React.js
  - React Router for routing
  - Axios for HTTP requests
  - CSS for styling
  
- Backend:
  - Node.js
  - Express.js
  - MongoDB for database
  - Mongoose for database modeling
  - JSON Web Tokens (JWT) for user authentication

## Installation

1. Clone the repository:
2. Navigate to the backend directory and install dependencies:
3. Start the backend server:
4. Open a new terminal, navigate to the frontend directory, and install dependencies:
5. Start the frontend server:
6. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Configuration

- MongoDB Connection: Update the MongoDB connection string in the `API/index.js` file with your MongoDB URI.
- Secret Key : Add your secret key in `API/Middleware/jwtAuthentication.js`

## Usage

- Sign Up: Create a new account by providing your username, email, password, address, and phone number.
- Log In: Log in with your email and password.
- Browse Products: View the list of available products and click on a product to view its details.
- Place Order: Proceed to checkout and place an order by providing your shipping address.
- View Profile: Update your profile information such as username, email, address, and phone number.
- Manage Products (Admin): Add, modify, and delete products.

## License

This project is licensed under the [MIT License](LICENSE).
