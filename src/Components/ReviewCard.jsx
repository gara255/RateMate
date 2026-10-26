export default function ReviewCard({ game, rating, pros, cons, verdict, background_image, author_username, reactions = {} }) {
    return (
        <article className="card">
            <div className="card-cover">
                {background_image ? <img src={background_image} alt={game} /> : "cover art"}
            </div>
            <div className="card-top">
                <div>
                    <h3>{game}</h3>
                    <div className="by">{author_username || "Anonymous"}</div>
                </div>
                <div className="score">{rating}</div>
            </div>
            <div className="pc-row">
                <p className="pros"><strong>Pros:</strong> {pros}</p>
                <p className="cons"><strong>Cons:</strong> {cons}</p>
            </div>
            <div className="verdict">
                <strong style={{ color: "var(--teal)" }}>Personal Take:</strong> <span style={{ color: "var(--ink)" }}>{verdict}</span>
            </div>
            <div className="reactions">
                <span className="pill">🔥 {reactions.fire || 0}</span>
                <span className="pill">💀 {reactions.skull || 0}</span>
                <span className="pill">🤝 {reactions.handshake || 0}</span>
            </div>
        </article>
    )
}