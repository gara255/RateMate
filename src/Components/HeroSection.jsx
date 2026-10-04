export default function HeroSection({onClick}) {



    return (
        <section className="hero wrap">
            <div>
                <h1>Say what you actually thought of the game.</h1>
                <p className="lede">Post a review, score it honestly, lay out the pros and cons — then let people react the way they would in your Discord, not with a star rating nobody reads.</p>
                <div className="hero-actions">
                    <a href="#catalog" className="btn-primary">Browse reviews</a>
                    <a className="btn-ghost" onClick={onClick}>Write your first one</a>
                </div>
            </div>
            <div className="hero-art">
                <div className="glow" aria-hidden="true"></div>
                <svg className="floating-controller" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a game controller">
                    <defs>
                        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2a2640" />
                            <stop offset="100%" stopColor="#1c1a2b" />
                        </linearGradient>
                    </defs>
                    <path d="M48 40 C20 40 6 62 10 92 C13 114 30 120 42 106 C50 96 58 92 70 92 L130 92 C142 92 150 96 158 106 C170 120 187 114 190 92 C194 62 180 40 152 40 C140 40 134 46 100 46 C66 46 60 40 48 40 Z"
                        fill="url(#body)" stroke="#3a3555" strokeWidth="2" />
                    <circle cx="54" cy="66" r="4" fill="#4fa8a0" />
                    <circle cx="54" cy="80" r="4" fill="#4fa8a0" />
                    <circle cx="47" cy="73" r="4" fill="#4fa8a0" />
                    <circle cx="61" cy="73" r="4" fill="#4fa8a0" />
                    <circle cx="140" cy="70" r="5" fill="#e8a23d" />
                    <circle cx="156" cy="62" r="5" fill="#e8a23d" opacity="0.6" />
                    <circle cx="156" cy="78" r="5" fill="#e8a23d" opacity="0.6" />
                    <circle cx="172" cy="70" r="5" fill="#e8a23d" opacity="0.6" />
                </svg>
            </div>
        </section>
    )
}