import db from "../models/index";

let getAllWishlistsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        let wishlists = await db.Wishlist.findAll({
            where: { userId: id },
            include: [
                {
                    model: db.Product,
                    include: [{ model: db.Publisher }],
                    raw: true,
                    nest: true
                }
            ],
            raw: true,
            nest: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: wishlists
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let createWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let isCheckWishlist = await db.Wishlist.findOne({ where: { userId, productId } })
        if (isCheckWishlist) {
            return res.status(200).json({
                errCode: 2,
                message: 'Your product is already in wishlist'
            })
        }
        await db.Wishlist.create({ userId, productId });
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

let deleteWishlist = async (req, res) => {
    try {
        let { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let wishlist = await db.Wishlist.findOne({ where: { userId, productId } })
        if (!wishlist) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The wishlist isn't exist `
            })
        }
        await db.Wishlist.destroy({ where: { userId, productId } });
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

module.exports = {
    getAllWishlistsByUserId, createWishlist, deleteWishlist
}