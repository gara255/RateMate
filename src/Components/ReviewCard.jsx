export default function ReviewCard({ game, rating, pros, cons, verdict, background_image }) {


    return (
        <article className="card">
            <div className="card-cover">{<img src ={background_image} alt = {game}/>}</div>
            <div className="card-top">
                <div>
                    <h3>{game}</h3>
                    <div className="by">Add User</div>
                </div>
                <div className="score">{rating}</div>
            </div>
            <div className="pc-row">
                <p className="pros"><strong>Pros:  {pros}</strong> </p>
                <p className="cons"><strong>Cons:  {cons}</strong> </p>
            </div>
            <div className="verdict">
                <strong>Personal Take:  {verdict}</strong>
            </div>
            <div className="reactions">
                <span className="pill">🔥 24</span>
                <span className="pill">💀 6</span>
                <span className="pill">🤝 11</span>
            </div>
        </article>
    )
}