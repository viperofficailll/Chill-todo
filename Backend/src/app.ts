import express from "express";
import cors from "cors";
import { todoRouter } from "./routes/todo.routes.js";

export const App = express();

App.use(
  cors({
    origin: `${process.env.VITE_FRONTEND_URL}`,
    credentials: true,
  }),
);

App.use(express.json());
App.use("/api/v1/todo", todoRouter);
