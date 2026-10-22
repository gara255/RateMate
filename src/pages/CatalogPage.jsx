import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from "react-router"
import ReviewCard from "../Components/ReviewCard"
import fetchRequest from "../API/fetchRequestToOurDB"
import styles from "./CatalogPage.module.css"

export default function CatalogPage() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function loadAllReviews() {
            const data = await fetchRequest('/Reviews?select=*&order=created_at.desc')
                .then(res => res.json())
            setReviews(data)
        }
        loadAllReviews()
    }, [])

    return (
        <section className={styles.section}>
            <div className={styles.wrap}>
                <div className={styles.sectionHead}>
                    <h2>All reviews</h2>
                    <p>Every review the catalog has, newest first.</p>
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
            </div>
        </section>
    )
}