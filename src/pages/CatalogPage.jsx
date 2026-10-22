import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from "react-router"
import ReviewCard from "../Components/ReviewCard"
import fetchRequest from "../API/fetchRequestToOurDB"
import styles from "./CatalogPage.module.css"

const PAGE_SIZE = 12

export default function CatalogPage() {
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        async function loadReviews() {
            const offset = (page - 1) * PAGE_SIZE
            // искаме 1 запис повече, за да знаем дали има следваща страница
            const data = await fetchRequest(
                `/Reviews?select=*&order=created_at.desc&limit=${PAGE_SIZE + 1}&offset=${offset}`
            ).then(res => res.json())

            setHasNextPage(data.length > PAGE_SIZE)
            setReviews(data.slice(0, PAGE_SIZE))
        }
        loadReviews()
    }, [page])

    return (
        <section className={styles.section}>
            <div className={styles.wrap}>
                <div className={styles.sectionHead}>
                    <h2>All reviews</h2>
                </div>

                <div className={styles.reviewGrid}>
                    <AnimatePresence>
                        {reviews.map(review => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link to={`/Reviews/${review.id}`} className={styles.cardLink}>
                                    <ReviewCard {...review} />
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className={styles.pagination}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                        disabled={!hasNextPage}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    )
}