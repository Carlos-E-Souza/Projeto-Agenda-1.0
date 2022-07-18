import { useState } from "react"
import { editarContato } from "../services/contactService"
import { BsFillXCircleFill, BsTelephoneFill } from "react-icons/bs"
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"
import Joi from "joi"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

export const EditarContatoModal = (props) => {
    const editarContatoSchema = Joi.object({
        _id: Joi.string(),
        userId: Joi.string(),
        __v: Joi.number(),
        nome: Joi.string().required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        foto: Joi.string().empty(""),
        telefone: Joi.string().length(13),
    })

    const [contato, setContato] = useState(props.editContato)
    const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const newContato = { ...contato, [name]: value }
        setContato(newContato)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem("token")
        try {
            await editarContatoSchema.validateAsync(contato)
            await editarContato(token, contato)
            props.closeModal()
            window.location.reload()
        } catch (err) {
            err.response
                ? setErrorMsg(err.response.data)
                : setErrorMsg(err.message)
            setIsErrorAlertVisible(true)
        }
    }

    return (
        <div className="modalContainer">
            {isErrorAlertVisible ? (
                <Alert
                    variant="filled"
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsErrorAlertVisible(false)
                            }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    {errorMsg}
                </Alert>
            ) : null}
            <div className="modalContent">
                <div className="add">
                    <span className="exitModal" onClick={props.closeModal}>
                        <BsFillXCircleFill />
                    </span>
                    Editar Contato
                </div>
                <div className="campos">
                    <div className="input-Container">
                        <span>
                            <AiOutlineUser />
                        </span>
                        <input
                            className="inputAdicionar "
                            type="text"
                            placeholder="Url da Imagem"
                            name="foto"
                            value={contato.foto}
                            onChange={handleInputChange}></input>
                    </div>

                    <div className="input-Container">
                        <span>
                            <AiOutlineUser />
                        </span>
                        <input
                            className="inputAdicionar "
                            type="text"
                            placeholder="Nome"
                            name="nome"
                            value={contato.nome}
                            onChange={handleInputChange}></input>
                    </div>

                    <div className="input-Container">
                        <span>
                            <AiOutlineMail />
                        </span>
                        <input
                            className="inputAdicionar "
                            type="text"
                            placeholder="E-mail"
                            name="email"
                            value={contato.email}
                            onChange={handleInputChange}></input>
                    </div>

                    <div className="input-Container">
                        <span>
                            <BsTelephoneFill />
                        </span>
                        <input
                            className="inputAdicionar "
                            type="tel"
                            placeholder="00 00000-0000"
                            name="telefone"
                            value={contato.telefone}
                            pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
                            onChange={handleInputChange}></input>
                        <button
                            className="botaoSalvar"
                            onClick={handleSubmitForm}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
