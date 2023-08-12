import db from "../models/index";
import slugify from 'slugify';

// let getAllProducts = async (req, res) => {
//     try {
//         const { page } = req.query;
//         let products = [];
//         let per_page = 2;
//         let total = await db.Product.count();
//         let total_pages = total % per_page === 0 ? total / per_page : Math.floor(total / per_page) + 1;
//         if (!page) {
//             products = await db.Product.findAll({
//                 include: [
//                     { model: db.Category },
//                     { model: db.Author }
//                 ],
//                 raw: true,
//                 nest: true
//             });
//         } else {
//             const skip = (page - 1) * per_page;
//             products = await db.Product.findAll({
//                 limit: per_page,
//                 offset: skip,
//                 include: [
//                     { model: db.Category },
//                     { model: db.Author }
//                 ],
//                 raw: true,
//                 nest: true
//             })
//         }
//         return res.status(200).json({
//             errCode: 0,
//             message: 'ok',
//             data: {
//                 page: +page,
//                 per_page,
//                 total,
//                 total_pages,
//                 data: products
//             }
//         })

//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from the server...',
//         })
//     }
// }

let getAllProducts = async (req, res) => {
    try {
        let products = await db.Product.findAll({
            include: [
                { model: db.Category },
                { model: db.Publisher }
            ],
            raw: true,
            nest: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: products
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let createProduct = async (req, res) => {
    try {
        let { title, desc, img, author, oldPrice, price, discount, quantityStock, categoryId, publisherId } = req.body;
        if (!title || !desc || !img || !author || !oldPrice || !price || !discount || !quantityStock || !categoryId || !publisherId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        const isCheckProduct = await db.Product.findOne({ where: { title } });
        if (isCheckProduct) {
            return res.status(200).json({
                errCode: 2,
                message: 'Product is already in used, Plz try another product'
            })
        }
        let slug = slugify(title, { lower: true });
        await db.Product.create({ title, slug, desc, img, author, oldPrice, price, discount, quantityStock, categoryId, publisherId })
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let editProduct = async (req, res) => {
    try {
        let { id, title, desc, img, categoryId, author, publisherId, oldPrice, price, discount, quantityStock } = req.body.payload;
        if (!id || !title || !desc || !img || !categoryId || !author || !publisherId || !oldPrice || !price || !discount || !quantityStock) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let product = await db.Product.findOne({ where: { id }, raw: false })
        if (!product) {
            return res.status(200).json({
                errCode: 2,
                message: `Product's not found`
            })
        }
        product.title = title;
        product.slug = slugify(title, { lower: true });
        product.desc = desc;
        product.img = img;
        product.categoryId = categoryId;
        product.author = author;
        product.publisherId = publisherId;
        product.oldPrice = oldPrice;
        product.price = price;
        product.discount = discount;
        product.quantityStock = quantityStock;
        await product.save();
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let deleteProduct = async (req, res) => {
    try {
        let { id } = req.query;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let product = await db.Product.findOne({ where: { id } })
        if (!product) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The product isn't exist `
            })
        }
        await db.Product.destroy({ where: { id } });
        return res.status(200).json({
            errCode: 0,
            message: 'ok'
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db.Product.findOne({
            where: { id },
            include: [
                { model: db.Category },
                { model: db.Publisher }
            ],
            raw: true,
            nest: true
        })
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: product
        })

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getProducts = async (req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        const category = await db.Category.findOne({ where: { slug: qCategory } });
        let products;

        if (qNew) {
            products = await db.Product.findAll({
                order: [['updatedAt', 'DESC']],
                limit: 1,
                include: [
                    { model: db.Category },
                    { model: db.Publisher }
                ],
                raw: true,
                nest: true
            })
        } else if (qCategory) {
            products = await db.Product.findAll({
                where: { categoryId: category.id },
                include: [
                    { model: db.Category },
                    { model: db.Publisher }
                ],
                raw: true,
                nest: true
            });
        } else {
            products = await db.Product.findAll({
                include: [
                    { model: db.Category },
                    { model: db.Publisher }
                ],
                raw: true,
                nest: true
            });
        }
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: products
        })

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getProductsHome = async (req, res) => {
    try {
        let limit = +req.query.limit;
        if (!limit) limit = 6;
        let products = await db.Product.findAll({
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.Category },
                { model: db.Publisher }
            ],
            raw: true,
            nest: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: products
        })

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getProductsDiscount = async (req, res) => {
    try {
        let limit = +req.query.limit;
        let discount = req.query.discount;
        if (!limit) limit = 6;
        let products = await db.Product.findAll({
            where: { discount },
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.Category },
                { model: db.Publisher }
            ],
            raw: true,
            nest: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: products
        })

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

module.exports = {
    getAllProducts, createProduct, editProduct, deleteProduct,
    getProductById, getProducts, getProductsHome, getProductsDiscount
}