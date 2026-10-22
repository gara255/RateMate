import '../styles.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'


function App() {

    return (
        <>

            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Write-review" element={<HomePage />} />
                <Route path="/Catalog/" element={<CatalogPage />} />
                <Route path="/Catalog/:id" element={<CatalogPage />} />
            </Routes>
            <Footer />

        </>

    )
}

export default App
