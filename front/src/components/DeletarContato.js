import { excluirContato } from "../services/contactService"

export const DeletarContatoModal = (props) => {
    const handleDelete = async () => {
        const token = sessionStorage.getItem("token")
        await excluirContato(token, props.contatoId)
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="modalContainer">
            <div className="modalErro">
                <span>Deseja excluir esse contato?</span>
                <div className="botoes">
                    <button onClick={() => handleDelete(props.contatoId)}>
                        Sim
                    </button>
                    <button onClick={props.closeModal}>Não</button>
                </div>
            </div>
        </div>
    )
}
