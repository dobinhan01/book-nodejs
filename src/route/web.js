import express from "express"
import middleware from "../middlewares/verifyToken"
import homeController from "../controllers/homeController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import categoryController from "../controllers/categoryController";
import bookController from "../controllers/bookController";
import customerController from "../controllers/customerController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    // router.get('/crud', homeController.getCRUD);

    router.post('/api/register', authController.register);
    router.post('/api/login', authController.login);
    // router.post('/api/logout', authController.logout);

    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-user', userController.postCreateUser);


    router.get('/api/get-current-user', middleware.verifyToken, userController.getCurrentUser);
    // router.get('/api/get-all-users', userController.handleGetAllUsers);
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/get-all-categories', categoryController.handleGetAllCategories);
    router.post('/api/create-new-category', categoryController.handleCreateNewCategory);
    router.put('/api/edit-category', categoryController.handleEditCategory);
    router.delete('/api/delete-category', categoryController.handleDeleteCategory);
    router.get('/api/category-home', categoryController.getCategoryHome);

    router.get('/api/get-all-books', bookController.handleGetAllBooks);
    router.post('/api/create-new-book', bookController.handleCreateNewBook);
    router.put('/api/edit-book', bookController.handleEditBook);
    router.delete('/api/delete-book', bookController.handleDeleteBook);
    router.get('/api/get-flash-sale-home', bookController.getFlashSaleHome);
    router.get('/api/get-detail-book-by-id', bookController.getDetailBookById);
    router.get('/api/get-book-by-category', bookController.getBookByCategory);

    router.post('/api/customer-add-to-cart', customerController.postAddBookToCart);
    router.get('/api/get-all-carts-by-user-id', customerController.getAllCartsByUserId);
    router.put('/api/update-cart-by-user-id', customerController.updateCartByUserId);


    return app.use("/", router);
}

module.exports = initWebRoutes;