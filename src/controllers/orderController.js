import db from "../models/index";

let getAllOrders = async (req, res) => {
    try {
        let orders = await db.Order.findAll({
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: orders
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let createOrder = async (req, res) => {
    try {
        const { firstName, lastName, address, phone, payment, note, date, total, userId, orderDetail } = req.body;
        if (!firstName || !lastName || !address || !phone || !payment || !date || !total || !userId || !orderDetail) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        const name = firstName + ' ' + lastName
        const order = await db.Order.create({ name, address, phone, payment, note, date, total, userId });
        if (orderDetail?.length > 0) {
            orderDetail.map((item) => {
                item.orderId = order.id
                return item
            })
        }
        if (orderDetail?.length > 0) {
            orderDetail.map(async (item) => {
                let product = await db.Product.findOne({
                    where: { id: item.productId },
                    raw: false
                });
                product.quantityStock -= item.quantity;
                console
                await product.save();
            })
        }
        await db.OrderDetail.bulkCreate(orderDetail);
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            orderId: order.id
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let editOrder = async (req, res) => {
    try {
        let { id } = req.params;
        let { status } = req.body;
        if (!id || !status) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let order = await db.Order.findOne({ where: { id }, raw: false })
        if (!order) {
            return res.status(200).json({
                errCode: 2,
                message: 'Order not found'
            })
        }
        order.status = status;
        await order.save();
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

let deleteOrder = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let order = await db.Order.findOne({ where: { id } })
        if (!order) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The order isn't exist `
            })
        }
        await db.Order.destroy({ where: { id } });
        await db.OrderDetail.destroy({ where: { orderId: id } });
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

let getLatestOrders = async (req, res) => {
    try {
        let orders = await db.Order.findAll({
            limit: 6,
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: orders
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getOrdersByUserId = async (req, res) => {
    try {
        let { id } = req.params;
        let orders = await db.Order.findAll({
            where: { userId: id }
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: orders
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getOrderDetailById = async (req, res) => {
    try {
        let { id } = req.params;
        let order = await db.Order.findOne({ where: { id } });
        let orderDetail = await db.OrderDetail.findAll({
            where: { orderId: id },
            include: [
                { model: db.Product }
            ],
            raw: true,
            nest: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: { order, orderDetail }
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }
}

let getOrderDetailByProductId = async (req, res) => {
    try {
        let { id } = req.params;
        let orderDetail = await db.OrderDetail.findAll({
            where: { productId: id },
            include: [
                { model: db.Order }
            ],
            raw: true,
            nest: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: orderDetail
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
    getAllOrders, createOrder, editOrder, deleteOrder,
    getLatestOrders, getOrdersByUserId, getOrderDetailById, getOrderDetailByProductId
}