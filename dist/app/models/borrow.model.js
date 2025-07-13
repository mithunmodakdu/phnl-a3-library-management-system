"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false,
});
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
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
