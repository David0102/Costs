import { Link } from "react-router-dom"
import styles from './css/Navbar.module.css'
import logo from '../../img/costs_logo.png'

import Container from "./Container"

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to='/'>
                    <img className={styles.logo} src={logo} alt="logo" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/projetos'>Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/sobre'>Sobre</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/contato'>Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar