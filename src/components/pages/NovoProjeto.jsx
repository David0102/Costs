import styles from './css/NovoProjeto.module.css'
import ProjetoForm from '../projeto/ProjetoForm'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CategoriaForm from '../categoria/CategoriaForm'
import Message from '../layout/Message'

function NovoProjeto() {

    const navigate = useNavigate()

    const [showFormCategoria, setShowFormCategoria] = useState(false)
    const [type, setType] = useState()
    const [categorias, setCategorias] = useState([])
    const [message, setMessage] = useState()

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

    //Função para requisição POST para cadastrar um projeto no banco
    function createPost(project) {

        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projetos", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json()
        ).then((data) => {
            console.log(data)
            navigate('/projetos', { state: { message: 'Projeto criado com sucesso!' } })
        }).catch((err) => {
            console.log(err)
        })

        setMessage()

    }

    function createCategoria(categoria) {

        if (!categoria.name) {
            setMessage('O campo não pode ser vazio!')
            setType('error')
            setTimeout(() => {
                setMessage()
            }, 3100)
            return false
        }

        fetch('http://localhost:5000/categorias', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        }).then((resp) => resp.json()
        ).then((data) => {
            setShowFormCategoria(!showFormCategoria)
            setMessage('Categoria criada com sucesso!')
            setType('success')
        }).catch((err) => console.log(err))

        setMessage()
    }

    function tuggleFormCategoria() {
        setShowFormCategoria(!showFormCategoria)
    }

    return (
        <div className={styles.novoprojeto_container}>
            {message && <Message msg={message} type={type} />}
            <div className={styles.novoprojeto_section}>
                <h1>Criar Projeto</h1>
                <p>Crie seu projeto e adicione serviços</p>
                <ProjetoForm categorias={categorias} handleSubmit={createPost} btnText="Criar projeto" />
            </div>
            <div className={styles.categoria_section}>
                <button className={styles.btn_categoria} onClick={tuggleFormCategoria}>
                    {!showFormCategoria ? 'Criar categoria' : 'Fechar'}
                </button>
                {showFormCategoria && (
                    <div className={styles.categoria_section_form}>
                        <CategoriaForm
                            handleSubmit={createCategoria}
                            btnText='Criar categoria'
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default NovoProjeto