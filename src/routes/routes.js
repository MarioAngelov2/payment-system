import { Router } from "express";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { createCard } from "../controllers/card.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create-card", createCard);

export { router };
