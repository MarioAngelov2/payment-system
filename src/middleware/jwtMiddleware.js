import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const jwtMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send("Access denied");
    }

    const decoded = jwt.verify(token, secret);

    console.log(decoded);
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
