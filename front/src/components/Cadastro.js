import { useState } from "react"
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"
import { BsFillKeyFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { registrarUser, authUser } from "../services/userService"

export function Cadastro(props) {
    const [user, setUser] = useState({ nome: "", email: "", senha: "" })
    const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const newUser = { ...user, [name]: value }
        setUser(newUser)
    }

    const handleSubmitCadastro = async (e) => {
        e.preventDefault()
        try {
            await registrarUser(user)
            const token = await authUser({
                email: user.email,
                senha: user.senha,
            })
            sessionStorage.setItem("token", token)
            navigate("/agenda")
        } catch (error) {
            setErrorMsg(error.response.data)
            setIsErrorAlertVisible(true)
        }
    }

    return (
        <div className="container">
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
            <header>
                <h1 className="titulo-Principal">Lista de Contatos</h1>
            </header>
            <div className="containerCadastro">
                <div className="box1">
                    <div className="borda-titulo-Cadastro">
                        <h2>Crie uma conta agora!</h2>
                    </div>
                    <div div className="borda-baixo-Cadastro">
                        <p>Já possui uma conta?</p>
                        <button
                            className="botaoPreto estiloBotao"
                            onClick={props.goToLogin}>
                            Login
                        </button>
                    </div>
                </div>
                <div className="box2">
                    <div className="borda-subtitulo-Cadastro">
                        <h2>Crie uma conta</h2>
                    </div>
                    <div className="input-Container">
                        <span>
                            <AiOutlineUser />
                        </span>
                        <input
                            className="input-Generico"
                            type="text"
                            placeholder="Nome"
                            name="nome"
                            value={user.nome}
                            onChange={handleInputChange}></input>
                    </div>

                    <div className="input-Container">
                        <span>
                            <AiOutlineMail />
                        </span>
                        <input
                            className="input-Generico"
                            type="text"
                            placeholder="E-mail"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}></input>
                    </div>

                    <div className="input-Container">
                        <span>
                            <BsFillKeyFill />
                        </span>
                        <input
                            className="input-Generico"
                            type="password"
                            placeholder="Senha"
                            name="senha"
                            value={user.senha}
                            onChange={handleInputChange}></input>
                    </div>

                    <button
                        className="botaoBranco"
                        onClick={handleSubmitCadastro}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}
