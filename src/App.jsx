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
import ProfilePage from './pages/ProfilePage'
import RequireGuest from './Components/RequireGuest'

function App() {
    const [auth, setAuthState] = useState(() => {
        try {
            const stored = localStorage.getItem('auth')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })

    const setAuth = (value) => {
        setAuthState(value)
        try {
            if (value) {
                localStorage.setItem('auth', JSON.stringify(value))
            } else {
                localStorage.removeItem('auth')
            }
        } catch {
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Write-review" element={<HomePage />} />
                <Route path="/Catalog" element={<CatalogPage />} />
                <Route path="/Catalog/:id" element={<ReviewDetailsPage />} />
                <Route path="/Register" element={<RequireGuest><RegisterPage /></RequireGuest>} />
                <Route path="/Login" element={<RequireGuest><LoginPage /></RequireGuest>} />
                <Route path="/Profile/:userId" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </AuthContext.Provider>
    )
}

export default App
