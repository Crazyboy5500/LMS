const bookSchema = require("../models/books");
const userSchema = require("../models/user");

exports.addBook = async (req, res) => {
    try {
        const { BibNum, Title, ItemCount, Author, ISBN, Publisher, Genre } = req.body;

        let existingBook = await bookSchema.findOne({ ISBN });
        if (!existingBook) {
            const book = new bookSchema({
                BibNum,
                Title,
                ItemCount,
                Author,
                ISBN,
                Publisher,
                Genre
            });
            await book.save();
            return res.status(200).json({ msg: "Book added successfully" });
        } else {
            return res.status(400).json({ msg: "Book already exists" });
        }
    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookSchema.find();
        return res.status(200).json({ books });
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const searchText = req.params.id;
        if (searchText === "-") {
            const books = await bookSchema.find();
            return res.status(200).json({ books });
        }
        const regex = new RegExp(searchText, 'i');
        const books = await bookSchema.find({ Title: { $regex: regex } }).limit(4);
        return res.status(200).json({ books });
    } catch (error) {
        console.error("Error searching books:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { username, books } = req.body;
        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ msg: "Invalid books array" });
        }

        const user = await userSchema.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        for (const ISBN of books) {
            const book = await bookSchema.findOne({ ISBN });
            if (!book) {
                return res.status(400).json({ msg: `Book with ISBN ${ISBN} not found` });
            }

            if (book.ItemCount > 0) {
                user.cart.push({ isbn: book.ISBN });
            } else {
                return res.status(400).json({ msg: `Book with ISBN ${ISBN} is out of stock` });
            }
        }

        await user.save();
        return res.status(200).json({ msg: "Books added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.checkout = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await userSchema.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const booksInCart = user.cart;
        const borrowedBooks = [];

        for (const { isbn } of booksInCart) {
            const book = await bookSchema.findOne({ ISBN: isbn });
            if (!book) {
                return res.status(400).json({ msg: `Book with ISBN ${isbn} not found` });
            }

            if (book.ItemCount > 0) {
                book.ItemCount -= 1;
                await book.save();

                borrowedBooks.push({ isbn: book.ISBN, takenDate: new Date() });
            } else {
                return res.status(400).json({ msg: `Book with ISBN ${isbn} is out of stock` });
            }
        }

        user.cart = [];
        user.borrowed = [...user.borrowed, ...borrowedBooks];
        await user.save();

        return res.status(200).json({ msg: "Checkout successful" });
    } catch (error) {
        console.error("Error during checkout:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.returnBooks = async (req, res) => {
    try {
        const { uniqueId, isbn } = req.body;
        const user = await userSchema.findOne({ uniqueId });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const books = await bookSchema.find({ ISBN: { $in: isbn } });
        if (books.length === 0) {
            return res.status(404).json({ msg: "No books found with the provided ISBN" });
        }

        user.borrowed = user.borrowed.filter(book => !isbn.includes(book.isbn));

        for (const book of books) {
            book.ItemCount += 1;
            await book.save();
        }

        await user.save();
        return res.status(200).json({ msg: "Books returned successfully" });
    } catch (error) {
        console.error("Error returning books:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { username, isbn } = req.body;
        const user = await userSchema.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.cart = user.cart.filter((book) => book.isbn !== isbn);
        await user.save();

        return res.status(200).json({ msg: "Book removed from cart successfully" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.filter = async (req, res) => {
    try {
        const { genre = 'all', year = 'all', title = 'all' } = req.params;
        const query = {};

        if (genre !== 'all') query.Genre = genre;
        if (year !== 'all') query.Year = year;
        if (title !== 'all') query.Title = { $regex: title, $options: 'i' };

        const books = await bookSchema.find(query);
        return res.status(200).json({ books });
    } catch (error) {
        console.error("Error filtering books:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.booksInCart = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userSchema.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isbnList = user.cart.map(book => book.isbn);
        const books = await bookSchema.find({ ISBN: { $in: isbnList } });

        if (books.length === 0) {
            return res.status(404).json({ msg: "No books found" });
        }

        return res.status(200).json({ books });
    } catch (error) {
        console.error("Error getting books in cart:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.borrowedBooks = async (req, res) => {
    try {
        const users = await userSchema.find({ borrowed: { $exists: true, $ne: [] } });

        if (users.length === 0) {
            return res.status(404).json({ msg: "No borrowed books found" });
        }

        const borrowedBooks = [];

        for (const user of users) {
            for (const book of user.borrowed) {
                const bookDetails = await bookSchema.findOne({ ISBN: book.isbn });
                borrowedBooks.push({
                    isbn: book.isbn,
                    title: bookDetails ? bookDetails.Title : "Unknown",
                    author: bookDetails ? bookDetails.Author : "Unknown",
                    uid: user.uniqueId,
                    borrower: user.name,
                    takenDate: book.takenDate,
                });
            }
        }

        return res.status(200).json(borrowedBooks);
    } catch (error) {
        console.error("Error fetching borrowed books:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};