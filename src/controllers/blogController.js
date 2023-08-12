import db from "../models/index";

let getAllBlogs = async (req, res) => {
    try {
        let blogs = await db.Blog.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: blogs
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let createBlog = async (req, res) => {
    try {
        const { title, author, date, tag, img, excerpt, contentHTML, contentMarkdown } = req.body;
        if (!title || !author || !date || !tag || !img || !excerpt || !contentHTML || !contentMarkdown) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let isCheckBlog = await db.Blog.findOne({ where: { title } })
        if (isCheckBlog) {
            return res.status(200).json({
                errCode: 2,
                message: 'Your blog is already in used, Plz try another blog'
            })
        }
        await db.Blog.create({ title, author, date, tag, img, excerpt, contentHTML, contentMarkdown });
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

let editBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let { title, author, date, tag, img, excerpt, contentHTML, contentMarkdown } = req.body;
        if (!title || !author || !date || !tag || !img || !excerpt || !contentHTML || !contentMarkdown) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let blog = await db.Blog.findOne({ where: { id }, raw: false })
        if (!blog) {
            return res.status(200).json({
                errCode: 2,
                message: 'Blog not found'
            })
        }
        blog.title = title;
        blog.author = author;
        blog.date = date;
        blog.tag = tag;
        blog.img = img;
        blog.excerpt = excerpt;
        blog.contentHTML = contentHTML;
        blog.contentMarkdown = contentMarkdown;
        await blog.save();
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

let deleteBlog = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let blog = await db.Blog.findOne({ where: { id } })
        if (!blog) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The blog isn't exist `
            })
        }
        await db.Blog.destroy({ where: { id } });
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

let getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        let blogs = await db.Blog.findOne({ where: { id } });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: blogs
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
    getAllBlogs, createBlog, editBlog, deleteBlog, getBlogById
}