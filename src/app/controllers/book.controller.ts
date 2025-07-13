import express, { NextFunction, Request, Response, Router } from "express";
import { Book } from "../models/book.model";

export const bookRoutes: Router = express.Router();

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
  try {
    let books = [];
    const bookGenre = req.query.filter
      ? req.query.filter.toString().toUpperCase()
      : "";
    const sortByField = req.query.sortBy;
    const sortType = req.query.sort;
    const limitNo = req.query.limit ? parseInt(req.query.limit.toString()) : 0;

    if (bookGenre) {
      books = await Book.find({ genre: bookGenre })
        .sort({ [sortByField as string]: sortType === "desc" ? "desc" : "asc" })
        .limit(limitNo);
    } else {
      books = await Book.find();
    }

    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Books Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

bookRoutes.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const updateData = req.body;
      const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedBook) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book NOT Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: await Book.findById(bookId),
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
});
