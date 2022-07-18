import { Routes, Route } from "react-router-dom"
import { LoginCadastro } from "./pages/LoginCadastro"
import { Agenda } from "./pages/Agenda"

import "./App.css"

function App() {
    return (
        <Routes>
            <Route path="/agenda" element={<Agenda />}></Route>
            <Route path="/" element={<LoginCadastro />} />
            <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
    )
}

export default App
