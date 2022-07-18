import { useState } from "react"
import { Login } from "../components/Login"
import { Cadastro } from "../components/Cadastro"

export function LoginCadastro() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div>
            {isLogin ? (
                <Login goToSingup={() => setIsLogin(false)} />
            ) : (
                <Cadastro goToLogin={() => setIsLogin(true)} />
            )}
        </div>
    )
}
