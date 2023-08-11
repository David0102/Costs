import Container from "../layout/Container"
import Message from "../layout/Message"
import styles from './css/Projetos.module.css'
import { useLocation } from "react-router-dom"
import LinkButton from "../layout/LinkButton"
import { useState, useEffect } from "react"
import ProjetoCard from "../projeto/ProjetoCard"
import Loading from "../layout/Loading"

function Projeto() {

    const [projetos, setProjetos] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProctMessage] = useState('')

    //Mensagens do sistema
    const location = useLocation()
    let mensagem = ''
    if (location.state) {
        mensagem = location.state.message
    }

    //Requisitando projetos da API
    useEffect(() => {
        fetch("http://localhost:5000/projetos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()
        ).then((data) => {
            console.log(data)
            setProjetos(data)
            setRemoveLoading(true)
        }).catch((err) => console.log(err))
    }, [])


    //Função para remover um projeto
    function removeProject(id) {

        fetch(`http://localhost:5000/projetos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json()
        ).then((data) => {
            setProjetos(projetos.filter((projeto) => projeto.id !== id))
            setProctMessage('Projeto removido com sucesso!')
        }).catch((err) => console.log(err))

        setProctMessage()
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos</h1>
                <LinkButton to="/novoprojeto" text="Criar Projeto" />
            </div>
            {mensagem && (<Message msg={mensagem} type="success" />)}
            {projectMessage && (<Message msg={projectMessage} type="success" />)}
            <Container customClass="start">
                {projetos.length > 0 && (
                    projetos.map((projeto) => (
                        <ProjetoCard
                            id={projeto.id}
                            nome={projeto.nome}
                            valor={projeto.valor}
                            categoria={projeto.categoria.name}
                            key={projeto.id}
                            handleRemove={removeProject}
                        />
                    ))
                )}
                {!removeLoading && <Loading />}
                {removeLoading && projetos.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projeto