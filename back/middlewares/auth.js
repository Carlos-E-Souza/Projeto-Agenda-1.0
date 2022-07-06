import jwt from "jsonwebtoken"
import config from "config"

export default function (req, res, next) {
    const token = req.header("auth-token")
    if (!token)
        return res.status(401).json("Acesso negado. Token não fornecido.")

    try {
        const decodeData = jwt.verify(token, config.get("jwtPrivateKey"))
        req.user = decodeData
        next()
    } catch (err) {
        return res.status(400).json("Token Inválido.")
    }
}
