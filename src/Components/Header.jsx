import { Link } from "react-router";

export default function Header() {

    return (
        <header>
            <nav className="wrap">
                <Link to="/" className="logo">Rate<span>Mate</span></Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/Catalog">Catalog</Link>
                </div>
                <Link to= "/Register" className="nav-cta">Sign Up</Link>
            </nav>
        </header>
    )
}   