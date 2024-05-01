import { loginService } from "../services/login.js";

export const login = async (req, res) => {
  try {
    const data = req.body;

    const token = await loginService(data);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
