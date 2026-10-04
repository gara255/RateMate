export default function Header() {
    return (
        <header>
            <nav className="wrap">
                <div className="logo">Rate<span>Mate</span></div>
                <div className="nav-links">
                    <a href="#catalog">Catalog</a>
                    <a href="#how">How it works</a>
                    <a href="#">Leaderboards</a>
                </div>
                <div className="nav-search">
                    <input type="text" className="search-input" placeholder="Search reviews..." />
                    <button className="search-icon-btn" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
                <button className="nav-cta">Sign in</button>
            </nav>
        </header>
    )
}   