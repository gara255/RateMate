export default function ReviewCard() {
    return (
        <article className="card">
            <div className="card-cover">cover art</div>
            <div className="card-top">
                <div>
                    <h3>Hollow Signal</h3>
                    <div className="by">by Marin</div>
                </div>
                <div className="score">8.4</div>
            </div>
            <p className="verdict">Atmosphere carries the first act harder than the combat does — worth it for the sound design alone.</p>
            <div className="pc-row">
                <div>👍 Pros: 3</div>
                <div>👎 Cons: 1</div>
            </div>
            <div className="reactions">
                <span className="pill">🔥 24</span>
                <span className="pill">💀 6</span>
                <span className="pill">🤝 11</span>
            </div>
        </article>
    )
}