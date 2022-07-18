import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authUser } from "../services/userService"
import { AiOutlineMail } from "react-icons/ai"
import { BsFillKeyFill } from "react-icons/bs"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

export function Login(props) {
    const [user, setUser] = useState({ email: "", senha: "" })
    const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const newUser = { ...user, [name]: value }
        setUser(newUser)
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        await authUser({ email: user.email, senha: user.senha })
            .then((res) => {
                sessionStorage.setItem("token", res)
                navigate("/agenda")
            })
            .catch((err) => {
                setErrorMsg(err.response.data)
                setIsErrorAlertVisible(true)
            })
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
            <div className="containerLogin">
                <div className="box1">
                    <div className="borda-titulo-Cadastro">
                        <h2>Bem-vindo de Volta!</h2>
                    </div>
                    <div div className="borda-baixo-Cadastro">
                        <p>Ainda não tem uma conta?</p>
                        <button
                            className="botaoPreto estiloBotao"
                            onClick={props.goToSingup}>
                            Cadastrar
                        </button>
                    </div>
                </div>
                <div className="box2">
                    <div className="borda-subtitulo-Cadastro especial">
                        <h2>Entrar na conta</h2>
                    </div>
                    <form>
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
                            className="botaoBranco retiraMargem"
                            onClick={handleSubmitLogin}>
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
