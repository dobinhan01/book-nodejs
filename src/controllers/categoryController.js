import db from "../models/index";
import slugify from 'slugify';

let getAllCategories = async (req, res) => {
    try {
        let categories = await db.Category.findAll();
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: categories
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let createCategory = async (req, res) => {
    try {
        const { name, img } = req.body;
        if (!name) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let isCheckCategory = await db.Category.findOne({ where: { name } })
        if (isCheckCategory) {
            return res.status(200).json({
                errCode: 2,
                message: 'Your category is already in used, Plz try another category'
            })
        }
        let slug = slugify(name, { lower: true });
        await db.Category.create({ name, slug, img });
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

let editCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, status } = req.body;
        if (!id || !name || !status) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let category = await db.Category.findOne({ where: { id }, raw: false })
        if (!category) {
            return res.status(200).json({
                errCode: 2,
                message: 'Category not found'
            })
        }
        category.name = name;
        category.slug = slugify(name, { lower: true });
        category.img = img;
        category.status = status;
        await category.save();
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

let deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let category = await db.Category.findOne({ where: { id } })
        if (!category) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The category isn't exist `
            })
        }
        await db.Category.destroy({ where: { id } });
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

let getCategoryHome = async (req, res) => {
    let limit = +req.query.limit;
    if (!limit) limit = 5;
    try {
        let categories = await db.Category.findAll({
            where: { status: '1' },
            limit
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: categories
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
    getAllCategories, createCategory, editCategory, deleteCategory,
    getCategoryHome,
}