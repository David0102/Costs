import styles from '../projeto/css/ProjetoCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

function ServicoCard({ id, nome, cost, descricao, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <h4>{nome}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{descricao}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServicoCard