// src/pages/LoginPage.jsx
import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext"
import styles from "./RegisterPage.module.css"
import login from "../API/login-api"

function LoginPage() {
    const { setAuth } = useContext(AuthContext)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const { email, password } = formData

        if (email.trim() === "" || password.trim() === "") {
            return setError("All fields are required.")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.trim())) {
            return setError("Please enter a valid email address.")
        }

        try {
            const response = await login(email, password)
            const loggedUser = await response.json()
            setAuth(loggedUser)
            navigate("/")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={styles.page}>
            <div className={`${styles.bgText} ${styles.bgText1}`}>RateMate</div>
            <div className={`${styles.bgText} ${styles.bgText2}`}>RateMate</div>
            <div className={`${styles.bgText} ${styles.bgText3}`}>RateMate</div>
            <div className={`${styles.bgText} ${styles.bgText4}`}>RateMate</div>

            <div className={styles.card}>
                <div className={styles.logo}>Rate<span>Mate</span></div>
                <h1>Log into your account</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.submitBtn}>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage