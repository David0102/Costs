import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../components/pages/Home'
import Sobre from '../components/pages/Sobre'
import Contato from '../components/pages/Contato'
import NovoProjeto from '../components/pages/NovoProjeto'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Projetos from '../components/pages/Projetos'

import Container from '../components/layout/Container'
import Projeto from '../components/pages/Projeto'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projetos' element={<Projetos />} />
            <Route path='/sobre' element={<Sobre />} />
            <Route path='/contato' element={<Contato />} />
            <Route path='/novoprojeto' element={<NovoProjeto />} />
            <Route path='/projeto/:id' element={<Projeto />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
