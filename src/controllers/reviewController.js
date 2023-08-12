import db from "../models/index";

let getAllReviews = async (req, res) => {
    try {
        let reviews = await db.Review.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.User,
                    include: [{ model: db.UserInfo }],
                    raw: true,
                    nest: true
                },
                { model: db.Product }
            ],
            raw: true,
            nest: true
        })
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: reviews
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

let creatReview = async (req, res) => {
    try {
        await db.Review.create(req.body);
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

let getReviewsByProductId = async (req, res) => {
    try {
        let { id } = req.params;
        const limit = 5;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let reviews = await db.Review.findAll({
            where: { productId: id },
            limit: limit,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.User,
                    include: [{ model: db.UserInfo }],
                    raw: true,
                    nest: true
                },
                { model: db.Product }
            ],
            raw: true,
            nest: true
        })
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: reviews
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
    getAllReviews, creatReview, getReviewsByProductId
}