import categoryService from "../servies/categoryService";

let handleGetAllCategories = async (req, res) => {
    try {
        let categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleCreateNewCategory = async (req, res) => {
    try {
        let category = await categoryService.createNewCategory(req.body);
        return res.status(200).json(category);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleEditCategory = async (req, res) => {
    try {
        let message = await categoryService.updateCategory(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let handleDeleteCategory = async (req, res) => {
    try {
        let message = await categoryService.deleteCategory(req.body.id);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getCategoryHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 6;
    try {
        let response = await categoryService.getCategoryHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        })
    }
}

module.exports = {
    handleGetAllCategories: handleGetAllCategories,
    handleCreateNewCategory: handleCreateNewCategory,
    handleEditCategory: handleEditCategory,
    handleDeleteCategory: handleDeleteCategory,
    getCategoryHome: getCategoryHome,
}