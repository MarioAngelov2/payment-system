# Payment Service

## 1. Introduction
- Payment System software. It provides ability to create a user profile and authenticate it when log in.
  Each authenticated user can add up to 5 credit cards. It includes deposit into user's account and also sending
  to another account funds
  
## 2. System Overview
- High-level description of the system architecture
    - Folder Architecture
      - `src/`: Contains the source code of the application.
      - `src/controllers/`: Handles incoming HTTP requests and responses.
      - `src/models/`: Defines data models for interacting with the database.
      - `src/routes/`: Defines the API routes.
      - `src/services`: Implements business logic and interacts with models.
      - `src/test/`: Contains test files.

   - Components Overview
      - `register`, `login` - Responsible for user authentication.
      - `createCard`, `getCards`, `deleteCard` - Handles credit card managment. 
      - `deposit` - Manages financial transactions.
  
- Technologies used (Node.js, npm packages, database)
   - `Node.js`: The runtime environment for executing JavaScript code server-side.
   - `Express.js`: A web application framework for Node.js, used for building APIs and handling HTTP requests.
   - `MongoDB`: A NoSQL database used for storing data.
   - `bcrypt`: A library for hashing passwords securely.
   - `jsonwebtoken`: Used for generating and verifying JSON Web Tokens (JWT) for user authentication.
   - `dotenv`: Used for loading environment variables from a .env file into process.env.
   - `chai and chai-http`: Assertion libraries for writing tests, with chai-http specifically for testing HTTP APIs.
   - `sinon`: A library for mocking, stubbing, and spying on JavaScript functions during testing.
   - `mocha`: A feature-rich JavaScript test framework running on Node.js, for running unit tests.
   - `nodemon`: A utility that monitors changes in your source code and automatically restarts the server.

- Diagram illustrating the system architecture (optional)

## 3. Detailed Description

### 3.1 Software Components
  1. Authentication Service
   - Description
      - This service is responsible for handling user authentication.
   - Endpoints/APIs
      - `/api/auth/register (POST)`: Creates a new user account.
      - `/api/auth/login (POST)`: Authenticates a user and generates a JWT token.
      - `/api/auth/logout (POST)`: Logs out a user and invalidates the JWT token.
   - Functionality
      - User registration: Allows users to create a new account with their credentials.
      - User authentication: Verifies user credentials and issues a JWT token upon successful login.
      - Token management: Handles token expiration, refresh, and revocation for secure user sessions.
  
  2. Card Service
   - Description
      - This service manages credit card operations for authenticated users.
   - Endpoints/APIs
      - `/api/cards/:id (GET)`: Retrieves all credit cards associated with the authenticated user by providing user ID as parameter.
      - `/api/cards (POST)`: Adds a new credit card to the user's account. 
          - Example JSON: 
              - {
              "number": "123456789",
              "cardHolder": "Mario Angelov",
              "expirationDate": "15.01.2024",
              "userId": "6630deb47dd4f29525e018af"
              }
   - Functionality

  3. Transaction Service
   - Description
   - Endpoints/APIs
   - Functionality

### 3.2 Data Models and Storage
  1. User Model
   - Description
   - Attributes
   - Relationships

  2. Card Model
   - Description
   - Attributes
   - Relationships
  
  3. Deposit Model
   - Description
   - Attributes
   - Relationships

  4. Transaction Model
   - Description
   - Attributes
   - Relationships

## 4. Security
  - Authentication (JWT implementation)
  - Data Encryption (encryption of sensitive data)
  - Logging (monitoring and debugging purposes)