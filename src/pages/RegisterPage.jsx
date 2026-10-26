import { useState } from "react"
import { Link, useNavigate } from "react-router"
import styles from "./RegisterPage.module.css"
import register from "../API/register-api"
import useAuth from "../hooks/useAuth"


export default function RegisterPage() {
    const { auth, setAuth } = useAuth()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const { username, email, password } = formData

        if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
            return setError('All fields are required.')
        }

        if (username.trim().length < 3) {
            return setError('Username must be at least 3 characters.')
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.trim())) {
            return setError('Please enter a valid email address.')
        }

        if (password.length < 8) {
            return setError('Password must be at least 8 characters.')
        }

        try {
            const response = await register(username, email, password)
            const user = await response.json()
            setAuth(user)
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
                <h1>Create your account</h1>
                <p className={styles.sub}>Start rating, reviewing, and reacting.</p>

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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
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
                        <span className={styles.hint}>At least 8 characters.</span>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.submitBtn}>Create account</button>
                </form>

                <p className={styles.foot}>Already have an account? <Link to="/Login">Log in</Link></p>
            </div>
        </div>
    )
}