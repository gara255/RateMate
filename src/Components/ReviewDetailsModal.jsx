import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import fetchRequest from "../API/fetchRequestToOurDB"
import useAuth from "../hooks/useAuth"
import styles from "./ReviewDetailsPage.module.css"

const REACTION_TYPES = [
    { key: "fire", emoji: "🔥" },
    { key: "skull", emoji: "💀" },
    { key: "handshake", emoji: "🤝" },
    { key: "eggplant", emoji: "🍆" },
    { key: "finger", emoji: "🖕" },
    { key: "check", emoji: "✅" },
    { key: "redx", emoji: "❌" },
]

export default function ReviewDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [review, setReview] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState(null)
    const [reactionCounts, setReactionCounts] = useState({})
    const [myReactions, setMyReactions] = useState({})

    useEffect(() => {
        async function loadReview() {
            const data = await fetchRequest(`/Reviews?select=*&id=eq.${id}`).then(res => res.json())
            setReview(data[0])
        }
        loadReview()
        loadReactions()
    }, [id])

    async function loadReactions() {
        const rows = await fetchRequest(`/Reactions?select=*&review_id=eq.${id}`).then(res => res.json())

        const counts = {}
        const mine = {}
        rows.forEach(row => {
            counts[row.type] = (counts[row.type] || 0) + 1
            if (auth?.user?.id && row.user_id === auth.user.id) {
                mine[row.type] = row.id
            }
        })
        setReactionCounts(counts)
        setMyReactions(mine)
    }

    if (!review) return <p className="wrap">Loading...</p>

    const isOwner = auth?.user?.id && auth.user.id === review.author_id

    const startEdit = () => {
        setEditData({ rating: review.rating, pros: review.pros, cons: review.cons, verdict: review.verdict })
        setIsEditing(true)
    }

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value })
    }

    const saveEdit = async () => {
        try {
            await fetchRequest(`/Reviews?id=eq.${id}`, 'PATCH', editData, null, auth?.access_token)
            setReview({ ...review, ...editData })
            setIsEditing(false)
        } catch (error) {
            alert(`Error saving changes: ${error.message}`)
        }
    }

    const deleteReview = async () => {
        if (!confirm("Delete this review? This can't be undone.")) return
        try {
            await fetchRequest(`/Reviews?id=eq.${id}`, 'DELETE', null, null, auth?.access_token)
            navigate('/Catalog')
        } catch (error) {
            alert(`Error deleting review: ${error.message}`)
        }
    }

    const react = async (type) => {
        if (!auth?.user) {
            navigate('/Register')
            return
        }

        try {
            if (myReactions[type]) {
                await fetchRequest(`/Reactions?id=eq.${myReactions[type]}`, 'DELETE', null, null, auth.access_token)
            } else {
                await fetchRequest('/Reactions', 'POST', {
                    review_id: Number(id),
                    user_id: auth.user.id,
                    type,
                }, null, auth.access_token)
            }
            loadReactions()
        } catch (error) {
            alert(`Error reacting: ${error.message}`)
        }
    }

    return (
        <section className={`${styles.details} wrap`}>
            <div className={styles.dHead}>
                <div className={styles.dCover}>
                    {review.background_image
                        ? <img src={review.background_image} alt={review.game} />
                        : "cover art"}
                </div>
                <div>
                    <div className={styles.dScore}>
                        <span>Score</span>
                        <strong>{review.rating}</strong>
                        <span>/10</span>
                    </div>
                    <h2>{review.game}</h2>
                    <div className={styles.dBy}>Reviewed by {review.author_username || "Anonymous"}</div>

                    {isOwner && !isEditing && (
                        <div className={styles.dActions}>
                            <button className="btn-ghost" onClick={startEdit}>Edit</button>
                            <button className="btn-ghost" onClick={deleteReview}>Delete</button>
                        </div>
                    )}
                </div>
            </div>

            {isEditing ? (
                <div className={styles.editBox}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" min="1" max="10" id="rating" name="rating" value={editData.rating} onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pros">Pros</label>
                        <textarea id="pros" name="pros" value={editData.pros} onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cons">Cons</label>
                        <textarea id="cons" name="cons" value={editData.cons} onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="verdict">Verdict</label>
                        <textarea id="verdict" name="verdict" value={editData.verdict} onChange={handleEditChange} />
                    </div>
                    <div className="modal-actions">
                        <button className="btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button className="btn-primary" onClick={saveEdit}>Save</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.pc}>
                        <div className={`${styles.pcBox} ${styles.pros}`}>
                            <h4>Pros</h4>
                            <p>{review.pros}</p>
                        </div>
                        <div className={`${styles.pcBox} ${styles.cons}`}>
                            <h4>Cons</h4>
                            <p>{review.cons}</p>
                        </div>
                    </div>

                    <div className={styles.verdictBox}>
                        <h4>Personal take</h4>
                        <p>{review.verdict}</p>
                    </div>
                </>
            )}

            <div className={styles.reactionsRow}>
                {REACTION_TYPES.map(({ key, emoji }) => (
                    <button
                        key={key}
                        className={styles.rbtn}
                        style={myReactions[key] ? { borderColor: "var(--amber)" } : undefined}
                        onClick={() => react(key)}
                    >
                        {emoji} {reactionCounts[key] || 0}
                    </button>
                ))}
            </div>
        </section>
    )
}