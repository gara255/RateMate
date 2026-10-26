import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from "react-router"
import ReviewCard from "../Components/ReviewCard"
import fetchRequest from "../API/fetchRequestToOurDB"
import styles from "./CatalogPage.module.css"

const PAGE_SIZE = 12

export default function CatalogPage() {
    const [reviews, setReviews] = useState([])
    const [reactionsMap, setReactionsMap] = useState({})
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        const abortController = new AbortController()

        async function loadReviews() {
            setLoading(true)
            setLoadError('')
            try {
                const offset = (page - 1) * PAGE_SIZE
                const data = await fetchRequest(
                    `/Reviews?select=*&order=created_at.desc&limit=${PAGE_SIZE + 1}&offset=${offset}`,
                    'GET',
                    null,
                    abortController.signal
                ).then(res => res.json())

                setHasNextPage(data.length > PAGE_SIZE)
                const pageReviews = data.slice(0, PAGE_SIZE)
                setReviews(pageReviews)

                if (pageReviews.length > 0) {
                    const ids = pageReviews.map(r => r.id).join(',')
                    const reactionRows = await fetchRequest(
                        `/Reactions?select=review_id,type&review_id=in.(${ids})`,
                        'GET',
                        null,
                        abortController.signal
                    ).then(res => res.json())

                    const map = {}
                    reactionRows.forEach(row => {
                        if (!map[row.review_id]) map[row.review_id] = {}
                        map[row.review_id][row.type] = (map[row.review_id][row.type] || 0) + 1
                    })
                    setReactionsMap(map)
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setLoadError("Couldn't load reviews. Please try again later.")
                }
            } finally {
                setLoading(false)
            }
        }

        loadReviews()

        return () => abortController.abort()
    }, [page])

    return (
        <section className={styles.section}>
            <div className={styles.wrap}>
                <div className={styles.sectionHead}>
                    <h2>All reviews</h2>
                </div>

                {loading && <p>Loading reviews...</p>}
                {loadError && <p style={{ color: "var(--bad, #ff8b91)" }}>{loadError}</p>}

                {!loading && !loadError && (
                    <>
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

                        <div className={styles.pagination}>
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
                            <span>Page {page}</span>
                            <button disabled={!hasNextPage} onClick={() => setPage(p => p + 1)}>Next →</button>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}