import styles from './css/Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjetoForm from '../projeto/ProjetoForm'
import ServicoCard from '../servico/ServicoCard'
import Message from '../layout/Message'
import ServicoForm from '../servico/ServicoForm'
import { v4 as uuidv4 } from 'uuid'

function Projeto() {

    const { id } = useParams()

    const [projeto, setProjeto] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [typeMessage, setTypeMessage] = useState()

    const [categorias, setCategorias] = useState([])

    //Requisição GET para recuperar as categorias do banco
    useEffect(() => {
        fetch("http://localhost:5000/categorias", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()
        ).then((data) => {
            setCategorias(data)
        }).catch((err) => console.log(err))
    }, [])

    //Recuperar projeto com id específico
    useEffect(() => {

        fetch(`http://localhost:5000/projetos/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json()
        ).then((data) => {
            setProjeto(data)
            setServices(data.services)
        }).catch((err) => console.log(err))

    }, [id])

    function editPost(projeto) {
        //Validar orçamento
        if (projeto.valor < projeto.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setTypeMessage('error')
            setTimeout(() => {
                setMessage()
            }, 3100)
            return false
        }

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto),
        }).then((resp) => resp.json()
        ).then((data) => {
            setProjeto(data)
            setShowProjectForm(!showProjectForm)
            setMessage('Projeto atualizado com sucesso!')
            setTypeMessage('success')
        }).catch((err) => {
            console.log(err)
            setMessage('Falha ao editar projeto!')
            setTypeMessage('error')
        })

        setMessage()
    }

    //Criar serviço
    function createService(projeto) {

        const lastService = projeto.services[projeto.services.length - 1]
        lastService.id = uuidv4()
        const newCost = parseFloat(projeto.cost) + parseFloat(lastService.cost)

        if (newCost > projeto.valor) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setTypeMessage('error')
            projeto.services.pop()
            setTimeout(() => {
                setMessage()
            }, 3100)
            return false
        }

        projeto.cost = newCost

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto),
        }).then((resp) => resp.json()
        ).then((data) => {
            setMessage('Serviço adicionado com sucesso!')
            setTypeMessage('success')
            tuggleServiceForm(!setShowServiceForm)
        }).catch((err) => {
            console.log(err)
            setMessage('Erro ao adicionar serviço!')
            setTypeMessage('error')
        })

        setMessage()

    }

    //Remover serviço
    function removeService(id, cost) {

        const servicesUpdated = projeto.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = projeto

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projetos/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json()
        ).then((data) => {
            setProjeto(projectUpdated)
            setServices(projectUpdated.services)
            setMessage('Serviço removido com sucesso!')
            setTypeMessage('success')
        }).catch((err) => console.log(err))

        setMessage()
    }

    //Alterar estado do botão
    function tuggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function tuggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {projeto.nome ? (
                <div className={styles.projectDetails}>
                    <Container customClass="column">
                        {message && <Message type={typeMessage} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {projeto.nome}</h1>
                            <button className={styles.btn} onClick={tuggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {projeto.categoria.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${projeto.valor}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${projeto.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjetoForm
                                        handleSubmit={editPost}
                                        btnText="Editar projeto"
                                        projectData={projeto}
                                        categorias={categorias}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.services_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={tuggleServiceForm}>
                                {!showServiceForm ? 'Adcionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServicoForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={projeto}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && (
                                services.map((service) => (
                                    <ServicoCard
                                        id={service.id}
                                        nome={service.nome}
                                        cost={service.cost}
                                        descricao={service.descricao}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            )}
                            {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                        </Container>
                    </Container>
                </div>
            ) : (<Loading />)}
        </>
    )
}

export default Projeto