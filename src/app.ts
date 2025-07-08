import express, { Application, Request, Response } from "express"
import genericErrorResponse from "./app/middlewares/genericErrorResponse";
import { bookRoutes } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());



app.use("/api/books", bookRoutes);

app.get("/", (req:Request, res:Response)=>{
  res.send("Welcome to Library Management App.")
})

app.use(genericErrorResponse);

export default app;