import express, { Application, Request, Response } from "express"
import genericErrorResponse from "./app/middlewares/genericErrorResponse";

const app: Application = express();

app.use(express.json());

app.use(genericErrorResponse);

app.get("/", (req:Request, res:Response)=>{
  res.send("Welcome to Library Management App.")
})

export default app;