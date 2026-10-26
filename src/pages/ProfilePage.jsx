import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import ReviewCard from "../Components/ReviewCard"
import fetchRequest from "../API/fetchRequestToOurDB"
import styles from "../pages/CatalogPage.module.css"

export default function ProfilePage() {
    const { userId } = useParams()
    const [reviews, setReviews] = useState([])
    const [reactionsMap, setReactionsMap] = useState({})
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserReviews() {
            setLoading(true)
            const data = await fetchRequest(`/Reviews?select=*&author_id=eq.${userId}&order=created_at.desc`)
                .then(res => res.json())

            setReviews(data)
            setUsername(data[0]?.author_username || "This user")

            if (data.length > 0) {
                const ids = data.map(r => r.id).join(',')
                const reactionRows = await fetchRequest(`/Reactions?select=review_id,type&review_id=in.(${ids})`)
                    .then(res => res.json())

                const map = {}
                reactionRows.forEach(row => {
                    if (!map[row.review_id]) map[row.review_id] = {}
                    map[row.review_id][row.type] = (map[row.review_id][row.type] || 0) + 1
                })
                setReactionsMap(map)
            }

            setLoading(false)
        }
        loadUserReviews()
    }, [userId])

    if (loading) return <p className="wrap">Loading...</p>

    return (
        <section className={styles.section}>
            <div className={styles.wrap}>
                <div className={styles.sectionHead}>
                    <h2>Reviews by {username}</h2>
                </div>

                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <div className={styles.reviewGrid}>
                        <AnimatePresence mode="popLayout">
                            {reviews.map(review => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link to={`/Catalog/${review.id}`} className={styles.cardLink}>
                                        <ReviewCard {...review} reactions={reactionsMap[review.id] || {}} />
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    )
}