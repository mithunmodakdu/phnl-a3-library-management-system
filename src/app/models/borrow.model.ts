import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "quantity must be a positive integer"],
      validate: {
        validator: Number.isInteger,
        message: "quantity must be an integer",
      },
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// borrowSchema.post("save", async function (doc, next) {
//  try {
//   const bookId = doc.book;
//   const book = await Book.findById(bookId);
  
//   if (book) {
//     book.copies -= doc.quantity;
//   }

//  } catch (error: any) {
//   console.error("failed to update book copies due to error:", error);
//   next(error);
//  }
// });

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
