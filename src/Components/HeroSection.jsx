export default function HeroSection({ onClick }) {



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
                <svg className="floating-controller" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a browser window showing a game review card">
                    <defs>
                        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2a2640" />
                            <stop offset="100%" stopColor="#1c1a2b" />
                        </linearGradient>
                    </defs>

                    <rect x="10" y="10" width="200" height="140" rx="12" fill="url(#body)" stroke="#3a3555" strokeWidth="2" />

                    <rect x="10" y="10" width="200" height="30" rx="12" fill="#211e32" stroke="#3a3555" strokeWidth="2" />
                    <rect x="10" y="28" width="200" height="12" fill="#211e32" />
                    <circle cx="26" cy="25" r="4" fill="#e8a23d" opacity="0.7" />
                    <circle cx="40" cy="25" r="4" fill="#4fa8a0" opacity="0.7" />
                    <circle cx="54" cy="25" r="4" fill="#6fb98a" opacity="0.7" />
                    <rect x="74" y="19" width="110" height="12" rx="6" fill="#322e47" />

                    <rect x="26" y="56" width="70" height="60" rx="8" fill="#322e47" />
                    <rect x="39" y="74" width="44" height="24" rx="12" fill="#1c1a2b" stroke="#3a3555" strokeWidth="1.5" />
                    <circle cx="49" cy="82" r="2" fill="#4fa8a0" />
                    <circle cx="49" cy="90" r="2" fill="#4fa8a0" />
                    <circle cx="45" cy="86" r="2" fill="#4fa8a0" />
                    <circle cx="53" cy="86" r="2" fill="#4fa8a0" />
                    <circle cx="73" cy="82" r="2.2" fill="#e8a23d" />
                    <circle cx="77" cy="88" r="2.2" fill="#e8a23d" opacity="0.7" />

                    <rect x="104" y="56" width="90" height="12" rx="4" fill="#322e47" />
                    <rect x="104" y="76" width="90" height="10" rx="4" fill="#2a2640" />
                    <rect x="104" y="92" width="60" height="10" rx="4" fill="#2a2640" />
                    <rect x="26" y="126" width="40" height="10" rx="4" fill="#e8a23d" opacity="0.6" />
                </svg>
            </div>
        </section>
    )
}