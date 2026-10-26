import { Link, useNavigate } from "react-router"
import useAuth from "../hooks/useAuth"

export default function Header() {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        setAuth(null)
        navigate("/")
    }

    return (
        <header>
            <nav className="wrap">
                <Link to="/" className="logo">Rate<span>Mate</span></Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/Catalog">Catalog</Link>
                </div>

                {auth?.user ? (
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

                        <Link to={`/Profile/${auth.user.id}`} className="nav-user">
                            {auth.user.user_metadata?.username || auth.user.email}
                        </Link>
                        <button className="nav-cta" onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <Link to="/Register" className="nav-cta">Sign up</Link>
                )}
            </nav>
        </header>
    )
}