import categoryService from "../servies/categoryService";

let handleGetAllCategories = async (req, res) => {
    let id = req.query.id;

    if (!id) {

        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            categories: []
        })
    }

    let categories = await categoryService.getAllCategories(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        categories
    })
}

let handleCreateNewCategory = async (req, res) => {
    let message = await categoryService.createNewCategory(req.body);
    return res.status(200).json(message);
}

let handleEditCategory = async (req, res) => {
    let message = await categoryService.updateCategory(req.body);
    // console.log('check', message)
    return res.status(200).json(message);
}

let handleDeleteCategory = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await categoryService.deleteCategory(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllCategories: handleGetAllCategories,
    handleCreateNewCategory: handleCreateNewCategory,
    handleEditCategory: handleEditCategory,
    handleDeleteCategory: handleDeleteCategory,
}