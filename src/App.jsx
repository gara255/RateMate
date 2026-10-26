import '../styles.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/PageNotFound'
import { useState } from 'react'
import { AuthContext } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import ReviewDetailsPage from './Components/ReviewDetailsModal'


function App() {
    const [auth, setAuth] = useState()

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Write-review" element={<HomePage />} />
                <Route path="/Catalog" element={<CatalogPage />} />
                <Route path="/Catalog/:id" element={<ReviewDetailsPage />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </AuthContext.Provider>
    )
}

export default App
