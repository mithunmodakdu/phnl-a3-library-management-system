# 📚 Library Management API

This Library Management API has been created for managing a library system using **Express**, **TypeScript**, and **MongoDB** (using Mongoose). This system supports CRUD operations for books, borrowing functionality, filtering/sorting, validation, and aggregation for borrow summary.

---

## Features

- We can create, retrieve, update, and delete books
- We can borrow books with availability validation
- Availability control on borrow with business logic
- Aggregated borrow report (total quantity borrowed per book)
- Schema validation and custom error handling middleware
- Filtering, sorting, and limiting support
- Mongoose instance method

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose)

---

## 📘 API Endpoints

All available API endpoints are described below:

---

### 📚 Book Endpoints

- **POST /api/books**  
  We can creates a new book in the library management database. It requires fields like title, author, genre, ISBN, and number of copies. It validates all input fields and returns the created book data if successful.

- **GET /api/books**  
  It retrieves a list of all books. It supports filtering by genre, sorting by any field (e.g., createdAt), and limiting the number of results. 

- **GET /api/books/:bookId**  
  It retrieves a single book's full details using its unique ID. 

- **PUT /api/books/:bookId**  
  It updates book data such as the number of copies or description. 

- **DELETE /api/books/:bookId**  
  It deletes a book from the library management database using its unique identifier.

---

### 🔄 Borrow Endpoints

- **POST /api/borrow**  
  It records a borrow action. It checks if the requested number of copies is available, deducts from copies, and sets availability to false if no copies remain. 

- **GET /api/borrow**  
  It provides a summary report of all borrowed books using MongoDB aggregation. Returns the total quantity borrowed per book, along with each book’s title and ISBN.

