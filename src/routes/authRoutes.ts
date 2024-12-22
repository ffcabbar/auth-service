import express from "express";
import { registerUser } from "../controllers/authController";
import { signupSchema } from "../validators/authValidator";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.post("/signup", validate(signupSchema), registerUser);

export default router;