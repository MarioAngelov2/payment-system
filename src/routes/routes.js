import { Router } from "express";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { createCard } from "../controllers/createCard.js";
import { getCards } from "../controllers/getCards.js";
import { deleteCard } from "../controllers/deleteCard.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create-card", createCard);
router.post("/get-cards", getCards);
router.delete("/delete-card/:id", deleteCard);

export { router };
