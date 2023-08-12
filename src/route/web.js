import express from "express"
import middleware from "../middlewares/verifyToken";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import categoryController from "../controllers/categoryController";
import productController from "../controllers/productController";
import publisherController from "../controllers/publisherController";
import wishlistController from "../controllers/wishlistController";
import orderController from "../controllers/orderController";
import contactController from "../controllers/contactController";
import reviewController from "../controllers/reviewController";
import blogController from "../controllers/blogController";

let router = express.Router();

let initWebRoutes = (app) => {

    //auth
    router.post('/api/register', authController.register);
    router.post('/api/login', authController.login);
    router.post('/api/login-admin', authController.loginAdmin);

    //user
    router.get('/api/get-current-user', middleware.verifyToken, userController.getCurrentUser);
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-user', middleware.verifyTokenAndAdmin, userController.createUser);
    router.put('/api/edit-user/:id', middleware.verifyTokenAndAdmin, userController.editUser);
    router.delete('/api/delete-user/:id', middleware.verifyTokenAndAdmin, userController.deleteUser);
    router.get('/api/get-allcode', userController.getAllCode);
    router.get('/api/get-user-info', userController.getUserInfo);
    router.put('/api/edit-user-info/:id', userController.editUserInfo);
    router.get('/api/get-amount-dashboard', userController.getAmountDashboard);

    //category
    router.get('/api/get-all-categories', categoryController.getAllCategories);
    router.post('/api/create-category', categoryController.createCategory);
    router.put('/api/edit-category/:id', categoryController.editCategory);
    router.delete('/api/delete-category/:id', categoryController.deleteCategory);
    router.get('/api/get-category-home', categoryController.getCategoryHome);

    //product
    router.get('/api/get-all-products', productController.getAllProducts);
    router.post('/api/create-product', productController.createProduct);
    router.put('/api/edit-product', productController.editProduct);
    router.delete('/api/delete-product', productController.deleteProduct);
    router.get('/api/get-product-by-id/:id', productController.getProductById);
    router.get('/api/get-products', productController.getProducts);
    router.get('/api/get-products-home', productController.getProductsHome);
    router.get('/api/get-products-discount', productController.getProductsDiscount);

    //publisher
    router.get('/api/get-all-publishers', publisherController.getAllPublishers);
    router.post('/api/create-publisher', publisherController.createPublisher);
    router.put('/api/edit-publisher/:id', publisherController.editPublisher);
    router.delete('/api/delete-publisher/:id', publisherController.deletePublisher);

    //wishlist
    router.get('/api/get-all-wishlists-by-user-id/:id', wishlistController.getAllWishlistsByUserId);
    router.post('/api/create-wishlist', wishlistController.createWishlist);
    router.delete('/api/delete-wishlist', wishlistController.deleteWishlist);

    //order
    router.get('/api/get-all-orders', orderController.getAllOrders);
    router.post('/api/create-order', orderController.createOrder);
    router.put('/api/edit-order/:id', orderController.editOrder);
    router.delete('/api/delete-order/:id', orderController.deleteOrder);
    router.get('/api/get-latest-orders', orderController.getLatestOrders);
    router.get('/api/get-orders-by-user-id/:id', orderController.getOrdersByUserId);
    router.get('/api/get-order-detail-by-id/:id', orderController.getOrderDetailById);
    router.get('/api/get-order-detail-by-product-id/:id', orderController.getOrderDetailByProductId);

    //contact
    router.get('/api/get-all-contacts', contactController.getAllContacts);
    router.post('/api/create-contact', contactController.createContact);
    router.delete('/api/delete-contact/:id', contactController.deleteContact);

    //review
    router.get('/api/get-all-reviews', reviewController.getAllReviews);
    router.post('/api/create-review', reviewController.creatReview);
    // router.delete('/api/delete-review/:id', reviewController.deleteReview);
    router.get('/api/get-reviews-by-product-id/:id', reviewController.getReviewsByProductId);

    //blog
    router.get('/api/get-all-blogs', blogController.getAllBlogs);
    router.post('/api/create-blog', blogController.createBlog);
    router.put('/api/edit-blog/:id', blogController.editBlog);
    router.delete('/api/delete-blog/:id', blogController.deleteBlog);
    router.get('/api/get-blog-by-id/:id', blogController.getBlogById);


    return app.use("/", router);
}

module.exports = initWebRoutes;