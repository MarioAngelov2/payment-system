import { Router } from "express";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { createCard } from "../controllers/createCard.js";
import { getCards } from "../controllers/getCards.js";
import { deleteCard } from "../controllers/deleteCard.js";
import { deposit } from "../controllers/deposit.js";
import { transaction } from "../controllers/transaction.js";
import { getTransactions } from "../controllers/getTransactions.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/cards/create-card", createCard);
router.get("/cards/get-cards/:id", getCards);
router.delete("/cards/delete-card/:id", deleteCard);
router.post("/transaction/deposit", deposit);
router.post("/transaction/transfer", transaction);
router.get("/transaction/get-transactions/:userId", getTransactions);

export { router };
