const Book = require('../model/book')
const User = require('../model/user')

exports.getFolders = async (req, res, next) => {
    const userId = '5ce14afa29d5fc35e4414849'
    try {
        const userFolders = await User.findById(userId).populate({
            path: 'folders',
            populate: {
                path: 'bookmarks'
            }
        })

        const book = await userFolders.populate('folders.bookmarks')

        const a = await User.findById(userId)
        res.status(200).json({
            message: 'Fetched folders',
            folders: userFolders.folders,
            // book: book,
            // a: a
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({
            createdAt: -1
        })
        res.status(200).json({
            message: 'Fetched books',
            books: books
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}


exports.addBook = async (req, res, next) => {
    const title = req.body.book.title
    const url = req.body.book.url
    console.log(title)
    console.log(url)
    const book = new Book({
        title: title,
        url: url,
        completed: false
    })
    try {
        const newBook = await book.save()
        res.status(201).json({
            message: 'Book created successfully!',
            book: newBook,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.bookId
    try {
        const book = await Book.findById(bookId)
        if (!book) {
            const error = new Error('Could not find book')
            error.statusCode = 404
            throw error
        }
        await Book.findByIdAndRemove(bookId)
        return res.status(200).json({
            message: 'Delete book.'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}