import db from "../models/index";

let getAllContacts = async (req, res) => {
    try {
        let contacts = await db.Contact.findAll()
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: contacts
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...',
        })
    }

}

let createContact = async (req, res) => {
    try {
        await db.Contact.create(req.body);
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

let deleteContact = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters!',
            })
        }
        let contact = await db.Contact.findOne({ where: { id } })
        if (!contact) {
            return res.status(200).json({
                errCode: 2,
                errMessage: `The contact isn't exist `
            })
        }
        await db.Contact.destroy({ where: { id } });
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
    getAllContacts, createContact, deleteContact
}