import bookService from "../servies/bookService";

let handleGetAllBooks = async (req, res) => {
    try {
        let books = await bookService.getAllBooks();
        return res.status(200).json(books);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleCreateNewBook = async (req, res) => {
    try {
        let response = await bookService.createNewBook(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleEditBook = async (req, res) => {
    try {
        let book = await bookService.updateBook(req.body);
        return res.status(200).json(book);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleDeleteBook = async (req, res) => {
    try {
        let message = await bookService.deleteBook(req.body.id);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getFlashSaleHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await bookService.getFlashSaleHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getDetailBookById = async (req, res) => {
    try {
        let info = await bookService.getDetailBookById(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        })
    }
}

let getBookByCategory = async (req, res) => {
    try {
        let info = await bookService.getBookByCategory(req.query.categoryId);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        })
    }
}

module.exports = {
    handleGetAllBooks: handleGetAllBooks,
    handleCreateNewBook: handleCreateNewBook,
    handleEditBook: handleEditBook,
    handleDeleteBook: handleDeleteBook,
    getFlashSaleHome: getFlashSaleHome,
    getDetailBookById: getDetailBookById,
    getBookByCategory: getBookByCategory,
}