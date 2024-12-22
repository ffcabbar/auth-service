import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import { apiLimiter } from "./middlewares/rateLimiter";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const startServer = async () => {
  try {
    const app = express();

    // Security Middlewares
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(mongoSanitize());
    app.use(hpp());

    app.use(express.json());
    app.use(apiLimiter);
    await connectDB();

    app.get("/", (req, res) => {
      res.send("Welcome to the Auth Service API");
    });

    // Authentication
    app.use("/api/auth", authRoutes);

    // Error handling middleware
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
