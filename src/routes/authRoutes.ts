import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { loginSchema, signupSchema } from "../validators/authValidator";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.post("/signup", validate(signupSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;