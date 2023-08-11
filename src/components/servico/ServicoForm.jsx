import { useState } from 'react'

import Input from '../form/Input'
import BotaoSubmit from '../form/BotaoSubmit'

function ServicoForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit}>
            <Input
                type="text"
                text="Nome do serviço"
                name="nome"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="descricao"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <BotaoSubmit text={btnText} />
        </form>
    )
}

export default ServicoForm