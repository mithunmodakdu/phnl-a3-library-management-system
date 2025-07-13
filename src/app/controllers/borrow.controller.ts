import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to borrow this book",
      error: error.message,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    console.log(summary);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error.message,
    });
  }
});
