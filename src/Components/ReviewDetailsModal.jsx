import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import fetchRequest from "../API/fetchRequestToOurDB"
import useAuth from "../hooks/useAuth"
import styles from "./ReviewDetailsPage.module.css"

export default function ReviewDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [review, setReview] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState(null)
    const [reactions, setReactions] = useState({ fire: 0, skull: 0, handshake: 0 })

    useEffect(() => {
        async function loadReview() {
            const data = await fetchRequest(`/Reviews?select=*&id=eq.${id}`).then(res => res.json())
            setReview(data[0])
        }
        loadReview()
    }, [id])

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
            await fetchRequest(`/Reviews?id=eq.${id}`, 'PATCH', editData)
            setReview({ ...review, ...editData })
            setIsEditing(false)
        } catch (error) {
            alert(`Error saving changes: ${error.message}`)
        }
    }

    const deleteReview = async () => {
        if (!confirm("Delete this review? This can't be undone.")) return
        try {
            await fetchRequest(`/Reviews?id=eq.${id}`, 'DELETE')
            navigate('/Catalog')
        } catch (error) {
            alert(`Error deleting review: ${error.message}`)
        }
    }

    const react = (type) => {
        setReactions({ ...reactions, [type]: reactions[type] + 1 })
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
                <button className={styles.rbtn} onClick={() => react('fire')}>🔥 {reactions.fire}</button>
                <button className={styles.rbtn} onClick={() => react('skull')}>💀 {reactions.skull}</button>
                <button className={styles.rbtn} onClick={() => react('handshake')}>🤝 {reactions.handshake}</button>
            </div>
        </section>
    )
}