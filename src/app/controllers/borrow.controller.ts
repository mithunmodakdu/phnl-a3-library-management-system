import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowBody = req.body;
      const quantity = borrowBody.quantity;
      const bookId = borrowBody.book;
      const book = await Book.findById(bookId);
      console.log(borrowBody, book);

      if (book) {
        if (quantity > book.copies) {
          res.status(400).json({
            success: false,
            message: `Only ${book.copies} copies are available.`,
          });
        } else {
          const updated = await book.updateAvailability(quantity);
          console.log(updated);
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Book NOT Found",
        });
      }

      const borrow = await Borrow.create(borrowBody);

      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });

    } catch (error) {
      next(error);
    }
  }
);
