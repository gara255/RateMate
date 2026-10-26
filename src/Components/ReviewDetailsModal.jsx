import { useState, useEffect } from "react"
import { useParams } from "react-router"
import fetchRequest from "../API/fetchRequestToOurDB"
import styles from "./ReviewDetailsPage.module.css"

export default function ReviewDetailsPage() {
    const { id } = useParams()
    const [review, setReview] = useState(null)

    useEffect(() => {
        async function loadReview() {
            const data = await fetchRequest(`/Reviews?select=*&id=eq.${id}`)
                .then(res => res.json())
            setReview(data[0])
        }
        loadReview()
    }, [id])

    if (!review) return <p className="wrap">Loading...</p>

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
                    <div className={styles.dBy}>Reviewed by Add User</div>
                    <div className={styles.dActions}>
                        <button className="btn-ghost">Edit</button>
                        <button className="btn-ghost">Delete</button>
                    </div>
                </div>
            </div>

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
                <h4 style={{ marginBottom: 8 }}>Personal take</h4>
                <p>{review.verdict}</p>
            </div>

            <div className={styles.reactionsRow}>
                <button className={styles.rbtn}>🔥 24</button>
                <button className={styles.rbtn}>💀 6</button>
                <button className={styles.rbtn}>🤝 11</button>
                <button className={styles.rbtn}>+ Add reaction</button>
            </div>
        </section>
    )
}