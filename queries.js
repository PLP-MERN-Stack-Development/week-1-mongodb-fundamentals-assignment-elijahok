// 1. Add missing fields to a few books
db.books.updateOne(
    { title: "1984" },
    {
      $set: {
        genre: "Dystopian",
        price: 10.99,
        in_stock: true,
        pages: 328,
        publisher: "Secker & Warburg"
      }
    }
  );
  
  db.books.updateOne(
    { title: "The Hobbit" },
    {
      $set: {
        genre: "Fantasy",
        price: 14.99,
        in_stock: true,
        pages: 310,
        publisher: "George Allen & Unwin"
      }
    }
  );
  
  db.books.updateOne(
    { title: "Pride and Prejudice" },
    {
      $set: {
        genre: "Romance",
        price: 9.99,
        in_stock: false,
        pages: 279,
        publisher: "T. Egerton"
      }
    }
  );
  
  // 2. Find all books in a specific genre
  db.books.find({ genre: "Fantasy" });
  
  // 3. Find books published after a certain year
  db.books.find({ published_year: { $gt: 1950 } });
  
  // 4. Find books by a specific author
  db.books.find({ author: "George Orwell" });
  
  // 5. Update the price of a specific book
  db.books.updateOne(
    { title: "The Hobbit" },
    { $set: { price: 12.49 } }
  );
  
  // 6. Delete a book by its title
  db.books.deleteOne({ title: "The Alchemist" });
  // Task 3
  db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } }
  );
  db.books.find(
    {},
    { title: 1, author: 1, price: 1, _id: 0 }
  );
  db.books.find().sort({ price: 1 });
  db.books.find().sort({ price: -1 });
  db.books.find().limit(5);
  db.books.find().skip(5).limit(5);
    // Task 4
    db.books.aggregate([
      {
        $group: {
          _id: "$genre",
          average_price: { $avg: "$price" }
        }
      }
    ]);
    db.books.aggregate([
      {
        $group: {
          _id: "$author",
          book_count: { $sum: 1 }
        }
      },
      { $sort: { book_count: -1 } },
      { $limit: 1 }
    ]);
    db.books.aggregate([
      {
        $project: {
          decade: {
            $concat: [
              { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
              "s"
            ]
          }
        }
      },
      {
        $group: {
          _id: "$decade",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
// Task 5
// ✅ Create an index on the title field
db.books.createIndex({ title: 1 });

// ✅ Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// ✅ Use explain() to show performance details with the index
db.books.find({ title: "1984" }).explain("executionStats");

db.books.find({ author: "George Orwell", published_year: { $gt: 1940 } }).explain("executionStats");
