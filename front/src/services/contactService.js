import { api } from "./api"

export const getContatos = async (token) => {
    return await api
        .get("/contato/", {
            headers: { "auth-token": token },
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            throw err
        })
}

export const criarContato = async (token, contatoData) => {
    const { nome, email, telefone } = contatoData
    const contato = contatoData.foto ? contatoData : { nome, email, telefone }

    return await api
        .post("/contato/criar", contato, {
            headers: { "auth-token": token },
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            throw err
        })
}

export const editarContato = async (token, contato) => {
    const url = "/contato/atualizar/" + contato._id
    return await api
        .put(
            url,
            {
                nome: contato.nome,
                email: contato.email,
                telefone: contato.telefone,
                foto: contato.foto,
            },
            {
                headers: { "auth-token": token },
            }
        )
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            throw err
        })
}

export const excluirContato = async (token, contatoId) => {
    return await api
        .delete(`/contato/deletar/${contatoId}`, {
            headers: { "auth-token": token },
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            throw err
        })
}
