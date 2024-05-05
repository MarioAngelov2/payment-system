# Payment Service

## 1. Introduction
- Payment System software. It allows users to set up a profile and verify their identity during login. Each verified user can link up to 5 credit cards to their profile. The system facilitates depositing funds into a user's account and transferring funds to another account
  
## 2. System Overview
- High-level description of the system architecture
    - Folder Architecture
      - `src/`: Contains the source code of the application.
      - `src/controllers/`: Handles incoming HTTP requests and responses.
      - `src/models/`: Defines data models for interacting with the database.
      - `src/routes/`: Defines the API routes.
      - `src/services`: Implements business logic and interacts with models.
      - `src/utils/`: Contains helper functions which might be used multiple times.
      - `src/middleware`: Containes middleware functions for verification and error handling.
      - `src/test/`: Contains test files.

   - Components Overview
      - `authController`, `authService` - Responsible for user authentication/authorization.
      - `cardsController`, `cardsService` - Handles credit card managment. 
      - `transactionsController`, `transactionsService` - Manages financial deposit/transfer into user's account.
  
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

## 3. Detailed Description

### 3.1 API Documentation
  1. **Swagger Documentation**
      - Description
         - The API documentation for this system is available through Swagger. For detailed explanation over the authorization, navigate to `Security` section down bellow.
      - Access
         - Copy GitHub repo, open `src` folder in terminal, write `npm start`, access the documentation on the following URL `http://localhost:5006/api-docs/`
      - Functionality
         - Provides detailed information about each API endpoint, including request parameters, response formats, and example requests/responses.

### 3.2 Software Components
  1. **Authentication Service**
   - Description
      - This service is responsible for handling user authentication. For detailed explanation over the authorization, navigate to `Security` section down bellow.
   - Endpoints/APIs
      - `/auth/register (POST)`: Creates a new user account.
      - `/auth/login (POST)`: Authenticates a user and generates a JWT token.
   - Functionality
      - User registration: Allows users to create a new account with their credentials.
      - User authentication: Verifies user credentials and issues a JWT token upon successful login.
      - Token management: Handles token expiration, refresh, and revocation for secure user sessions.
  
  2. **Card Service**
   - Description
      - This service manages credit card operations for authenticated users.
   - Endpoints/APIs
      - `/cards/get-cards/:id (GET)`: Retrieves all credit cards associated with the authenticated user by providing user ID as parameter.
      - `/cards/create-card (POST)`: Adds a new credit card to the user's account. 
      - `/cards/delete-card/:id (DELETE)`: Deletes a credit card from the user's account.
   - Functionality
      - Card creation: Allows users to add new credit cards to their account.
      - Card retrieval: Retrieves a list of all credit cards associated with the user.
      - Card deletion: Enables users to remove a credit card from their account.

  3. **Transaction Service**
   - Description
      - This service manages transactions between users. 
   - Endpoints/APIs
      - `/transaction/transfer (POST)`: Creates a transaction from one to another user. 
      - `/transaction/get-transactions/:userId (GET)`: Gets all transactions per user by providing user ID as parameter.
   - Functionality
      - Transfer funds: Allow the user to transfer funds to another user's account.
      - List all transactions: Retrieves a list of all transactions per user.

### 3.3 Data Models and Storage
  1. **User Model**
   - Description
      - Defines the structure of user data stored in the database.
   - Attributes
      - First name
      - Last name
      - Email 
      - Password (encrypted)
      - Address
      - Phone Number
      - Birth Date
      - Balance (default 0)
   - Relationships
      - None
      
  2. **Card Model**
   - Description
      - Represents credit card details associated with user accounts.
   - Attributes
      - Number (masked)
      - Cardholder name
      - Expiration date
   - Relationships
      - Belongs to a user (via user ID)
      
  3. **Deposit Model**
   - Description
      - Stores details of top-up deposits into user accounts.
      - Update user's balance.
   - Attributes
      - Amount
      - Card ID (associated with the deposit)
      - Date of deposit
   - Relationships
      - Belongs to a user (via user ID)
      - Associated with a credit card (via card ID)
    
  4. **Transaction Model**
   - Description
      - Records details of financial transactions between users.
   - Attributes
      - Sender (user ID)
      - Receiver (user ID) 
      - Amount
      - Date of transaction
   - Relationships
      - Associated with user (via user ID)
      
## 4. Security
   ### Authentication and authorization
   - To access the endpoints that require authentication, you need to obtain a bearer token. Follow these steps to obtain a token:
     - **Register a User**: If you haven't already registered, send a `POST` request to `/auth/register` with your user details to create an account.
     - **Login**: Once registered, send a `POST` request to `/auth/login` with your credentials to obtain a bearer token.
     - **Example of received token**: `token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIgTmFtZSIsImlhdCI6MTYxNjIzOTAyMn0.QXRoYW5Abm93c3BhcmtldHNlcnZpY2VzLmNvbQ==`
   
   ### Using the Bearer Token
   - If you decide to test with provided Swagger API endpoints, you have to make sure that you include the token in the following way in the `Authorize` input: 
   `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIgTmFtZSIsImlhdCI6MTYxNjIzOTAyMn0.QXRoYW5Abm93c3BhcmtldHNlcnZpY2VzLmNvbQ==` you can replace the example with your own generated token.
   - When testing with Postman you **YOU DO NOT INCLUDE THE WORD BEARER INFRONT OF THE TOKEN** it is automatically added by Postman durring the process. 

## Installation
   - Clone repo 
   - Open in terminal `payment-system` folder and run `npm start`

## User auth flow diagram

   <img src="./screenshots/user-auth.drawio.png" />

## Deposit/Transaction flow

   <img src="./screenshots/payment-diagram.drawio.png"/>
