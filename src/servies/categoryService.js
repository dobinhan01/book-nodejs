import db from "../models/index";

let getAllCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll();
            resolve({
                errCode: 0,
                message: 'ok',
                categories
            });
        } catch (e) {
            reject(e)
        }
    })
}

let checkCategory = (categoryName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({
                where: { categoryName: categoryName }
            })
            if (category) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkCategory(data.categoryName);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your category is already in used, Plz try another category'
                })
            } else {
                await db.Category.create({
                    categoryName: data.categoryName
                })
                resolve({
                    errCode: 0,
                    message: 'ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.categoryName) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                });
            }
            let category = await db.Category.findOne({
                where: { id: data.id },
                raw: false
            })
            if (category) {
                category.categoryName = data.categoryName;
                await category.save();
                resolve({
                    errCode: 0,
                    message: 'Update category sucessed!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `Category's not found!`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        let category = await db.Category.findOne({
            where: { id: categoryId }
        })
        if (!category) {
            resolve({
                errCode: 2,
                errMessage: `The category isn't exist `
            })
        }
        await db.Category.destroy({
            where: { id: categoryId }
        });

        resolve({
            errCode: 0,
            message: `The category is deleted`
        })
    })
}

let getCategoryHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: categories
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllCategories: getAllCategories,
    createNewCategory: createNewCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
    getCategoryHome: getCategoryHome,
}