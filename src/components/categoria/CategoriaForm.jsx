import styles from './css/CategoriaForm.module.css'
import Input from '../form/Input'
import BotaoSubmit from '../form/BotaoSubmit'
import { useState } from 'react'

function CategoriaForm({ btnText, handleSubmit }) {

    const [categoria, setCategoria] = useState({})

    function submit(e) {
        e.preventDefault()
        handleSubmit(categoria)
    }

    function handleChange(e) {
        setCategoria({ [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.form}>
            <form onSubmit={submit}>
                <Input
                    type='text'
                    name='name'
                    text='Nome da categoria'
                    placeholder="Digite o nome da categoria"
                    handleOnChange={handleChange}
                />
                <BotaoSubmit text={btnText} />
            </form>
        </div>
    )
}

export default CategoriaForm