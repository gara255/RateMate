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

        if (formData.username.trim() === '' || formData.email.trim() === '' || formData.password.trim() === '') {
            return setError('All fields are required.')
        }
        try {
            let user = await register(formData.username, formData.email, formData.password)
            setAuth(user)
            navigate("/")

        } catch (error) {
            console.log(error.message)
        }
        // TODO: Supabase Auth register call тук, после navigate('/')
        console.log('Submitting:', formData)
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