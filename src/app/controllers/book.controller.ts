import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const book = await Book.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRoutes.get("/", async (req: Request, res: Response) => {
  let books = [];
  let bookGenre = req.query.filter? req.query.filter.toString().toUpperCase() : "";
  const sortByField = req.query.sortBy;
  const sortType = req.query.sort;
  const limitNo = req.query.limit;

  if(bookGenre){
    books = await Book.find({genre: bookGenre})
    .sort({[sortByField as string]: sortType === "desc"? "desc": "asc"})
    .limit(Number(limitNo));
  } else{
    books = await Book.find();
  }
  
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});
