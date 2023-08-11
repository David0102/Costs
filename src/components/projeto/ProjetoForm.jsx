import BotaoSubmit from '../form/BotaoSubmit'
import Input from '../form/Input'
import Select from '../form/Select'
import styles from './css/ProjetoForm.module.css'
import { useState } from 'react'

function ProjetoForm({ btnText, categorias, handleSubmit, projectData }) {

    const [projeto, setProjeto] = useState(projectData || {})

    //Função para passar o objeto como parâmetro na função de criar o post, assim que o formulário for enviado
    const submit = (e) => {
        e.preventDefault()
        //console.log(projeto)
        handleSubmit(projeto)
    }

    //setar valores dos inputs na constante projeto
    function handleChange(e) {
        setProjeto({ ...projeto, [e.target.name]: e.target.value })
    }

    //setar valor do select na constante projeto
    function handleCategoria(e) {
        setProjeto({
            ...projeto, categoria: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input value={projeto.nome ? projeto.nome : ''} handleOnChange={handleChange} type="text" text="Nome do projeto" name="nome" placeholder="Insira o nome do projeto" />
            <Input value={projeto.valor ? projeto.valor : ''} handleOnChange={handleChange} type="Number" text="Orçamento" name="valor" placeholder="Insira o orçamento total" />
            <Select handleOnChange={handleCategoria} name="categoria_id" text="Selecione a categoria"
                options={categorias} value={projeto.categoria ? projeto.categoria.id : ''} />
            <BotaoSubmit text={btnText} />
        </form>
    )
}

export default ProjetoForm