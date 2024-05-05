import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  createCard,
  deleteCard,
  getCards,
} from "../controllers/cardsController.js";
import {
  getTransactions,
  deposit,
  transaction,
} from "../controllers/transactionsController.js";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";
import {
  registerValidation,
  authValidationMiddleware,
  loginValidation,
} from "../middleware/authValidation.js";
import {
  deleteCardValidation,
  getCardsValidation,
  createCardValidation,
  cardValidationMiddleware,
} from "../middleware/cardValidation.js";
import {
  transactionValidationMiddleware,
  transferValidation,
  getTransactionsValidation,
  depositValidation,
} from "../middleware/transactionValidation.js";

const router = Router();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Payment System API",
      version: "1.0.0",
    },
  },
  apis: ["src/routes/routes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register new user
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             address:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             birthDate:
 *               type: string
 *             balance:
 *               type: number
 *     responses:
 *       201:
 *         description: User created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login user
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User login object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /cards/create-card:
 *   post:
 *     security:
 *      - BearerAuth: []
 *     description: Create new card
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Create card object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cardNumber:
 *               type: string
 *             cardHolder:
 *               type: string
 *             expirationDate:
 *               type: string
 *             userId:
 *               type: string
 *     responses:
 *       201:
 *         description: Card created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /cards/get-cards/{id}:
 *   get:
 *     security:
 *      - BearerAuth: []
 *     description: List all cards of a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to get cards
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cards retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             cards:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    cardNumber:
 *                      type: string
 *                    cardHolder:
 *                      type: string
 *                    expirationDate:
 *                      type: string
 *                    userId:
 *                      type: string
 *                    encryptionIV:
 *                      type: string
 */

/**
 * @swagger
 * /cards/delete-card/{id}:
 *   delete:
 *     security:
 *      - BearerAuth: []
 *     description: Deletes a card
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Card ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cards deleted successfully
 */

/**
 * @swagger
 * /transaction/deposit:
 *   post:
 *     security:
 *      - BearerAuth: []
 *     description: Deposit funds to user account
 *     parameters:
 *       - in: body
 *         name: card
 *         description: Deposit object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cardId:
 *               type: string
 *             amount:
 *               type: number
 *             cardNumber:
 *               type: string
 *     responses:
 *       201:
 *         description: Depoist successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /transaction/transfer:
 *   post:
 *     security: 
 *      - BearerAuth: []
 *     description: Transfer funds to another user account
 *     parameters:
 *       - in: body
 *         name: card
 *         description: Transfer object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             senderId:
 *               type: string
 *             receiverId:
 *               type: string
 *             amount:
 *               type: number
 *             cardNumber:
 *               type: string
 *             cardId:
 *               type: string
 *     responses:
 *       201:
 *         description: Transaction successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /transaction/get-transactions/{userId}:
 *   get:
 *     security:
 *      - BearerAuth: []
 *     description: List transactions per user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID to get user's transactions
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             transactions:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    sender:
 *                      type: string
 *                    receiver:
 *                      type: string
 *                    amount:
 *                      type: number
 *                    date:
 *                      type: string
 */

router.post(
  "/auth/register",
  authValidationMiddleware(registerValidation),
  register
);
router.post("/auth/login", authValidationMiddleware(loginValidation), login);
router.post(
  "/cards/create-card",
  jwtMiddleware,
  cardValidationMiddleware(createCardValidation),
  createCard
);
router.get(
  "/cards/get-cards/:id",
  cardValidationMiddleware(getCardsValidation),
  jwtMiddleware,
  getCards
);
router.delete(
  "/cards/delete-card/:id",
  cardValidationMiddleware(deleteCardValidation),
  jwtMiddleware,
  deleteCard
);
router.post(
  "/transaction/deposit",
  transactionValidationMiddleware(depositValidation),
  jwtMiddleware,
  deposit
);
router.post(
  "/transaction/transfer",
  transactionValidationMiddleware(transferValidation),
  jwtMiddleware,
  transaction
);
router.get(
  "/transaction/get-transactions/:userId",
  transactionValidationMiddleware(getTransactionsValidation),
  jwtMiddleware,
  getTransactions
);

export { router };
