import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { protect } from "./middlewares/authMiddleware.js";

// Connection to Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
let corsOptions = {
  origin: "https://socialmedia-frontendcode.vercel.app/",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", protect, postRoutes);

app.get("/", (req, res) => res.send("MERN is working"));

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// server setup
app.listen(PORT, () =>
  console.log(`Server Running on PORT: ${PORT} ${process.env.JWT_SECRET}`)
);
