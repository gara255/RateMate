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

        if (formData.email.trim() === "" || formData.password.trim() === "") {
            return setError("All fields are required.")
        }

        try {
            const loggedUser = await login(formData.user, formData.password)
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
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="GameFan123"
                            autoComplete="off"
                            value={formData.username}
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
                        <span className={styles.hint}>At least 8 characters.</span>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.submitBtn}>Log In</button>
                </form>

            </div>
        </div>
    )
}

export default LoginPage