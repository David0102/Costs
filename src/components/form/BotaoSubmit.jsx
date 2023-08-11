import styles from './css/BotaoSubmit.module.css'

function BotaoSubmit({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default BotaoSubmit