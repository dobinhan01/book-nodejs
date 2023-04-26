import customerService from "../servies/customerService";

let postAddBookToCart = async (req, res) => {
    try {
        let data = await customerService.postAddBookToCart(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getAllCartsByUserId = async (req, res) => {
    try {
        let data = await customerService.getAllCartsByUserId(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let updateCartByUserId = async (req, res) => {
    try {
        let data = await customerService.updateCartByUserId(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

module.exports = {
    postAddBookToCart, getAllCartsByUserId, updateCartByUserId
}