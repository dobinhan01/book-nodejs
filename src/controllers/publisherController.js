import db from "../models/index";
import slugify from 'slugify';

let getAllPublishers = async (req, res) => {
    try {
        let publishers = await db.Publisher.findAll();
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: publishers
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let createPublisher = async (req, res) => {
    try {
        const { name, img, desc } = req.body;
        if (!name || !img || !desc) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let isCheckPublisher = await db.Publisher.findOne({ where: { name } })
        if (isCheckPublisher) {
            return res.status(200).json({
                errCode: 2,
                message: 'Your publisher is already in used, Plz try another publisher'
            })
        }
        let slug = slugify(name, { lower: true });
        await db.Publisher.create({ name, slug, img, desc });
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

let editPublisher = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, desc } = req.body;
        if (!id || !name || !img || !desc) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let publisher = await db.Publisher.findOne({ where: { id }, raw: false })
        if (!publisher) {
            return res.status(200).json({
                errCode: 2,
                message: 'Publisher not found'
            })
        }
        publisher.name = name;
        publisher.slug = slugify(name, { lower: true });
        publisher.img = img;
        publisher.desc = desc;
        await publisher.save();
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

let deletePublisher = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let publisher = await db.Publisher.findOne({ where: { id } })
        if (!publisher) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The publisher isn't exist `
            })
        }
        await db.Publisher.destroy({ where: { id } });
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
    getAllPublishers, createPublisher, editPublisher, deletePublisher
}