const Joi = require("joi")
const { isValidObjectId } = require("mongoose")
const {
    getContatosDB,
    createContatoDB,
    updateContatoDB,
    deleteContatoDB,
} = require("../services/contactService")

class ContactController {
    validarContato = (contato) => {
        const schema = Joi.object({
            nome: Joi.string().required().min(5),
            email: Joi.string().email().required(),
            telefone: Joi.string().required().min(11),
            foto: Joi.string().optional(),
        })
        return schema.validate(contato)
    }

    getContatos = async (req, res) => {
        return await getContatosDB(req.user._id)
            .then((contatos) => {
                return res.json(contatos)
            })
            .catch((err) => {
                return res.status(500).json(err.message)
            })
    }

    createContato = async (req, res) => {
        const { error } = this.validarContato(req.body)
        if (error) return res.status(400).json(error.message)

        return await createContatoDB({ ...req.body, userId: req.user._id })
            .then((contato) => {
                return res.json(contato)
            })
            .catch((err) => {
                return res.status(500).json(err.message)
            })
    }

    updateContato = async (req, res) => {
        if (!isValidObjectId(req.params.contatoId))
            return res.status(400).json("ID Inválido")

        const { error } = this.validarContato(req.body)
        if (error) return res.status(400).json(error.message)

        return await updateContatoDB(req.params.contatoId, req.body)
            .then((contatoAtualizado) => {
                return res.json(contatoAtualizado)
            })
            .catch((err) => {
                return res.status(500).json(err.message)
            })
    }

    deleteContato = async (req, res) => {
        if (!isValidObjectId(req.params.contatoId))
            return res.status(400).json("ID Inválido")

        return await deleteContatoDB(req.params.contatoId)
            .then((contatoDeletado) => {
                return res.json(contatoDeletado)
            })
            .catch((err) => {
                return res.status(500).json(err.message)
            })
    }
}

module.exports = {
    ContactController,
}
