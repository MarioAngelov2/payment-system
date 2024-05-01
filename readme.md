# Payment Service

## 1. Introduction
- Brief overview of the payment software
  
## 2. System Overview
- High-level description of the system architecture
   - Payment System software. It provides ability to create a user profile and authenticate it when log in.
    Each authenticated user can add up to 5 credit cards. It includes deposit into user's account and also sending
    to another account funds.
  
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
   - Endpoints/APIs
   - Functionality
  
  2. Card Service
   - Description
   - Endpoints/APIs
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