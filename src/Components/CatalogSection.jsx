import ReviewCard from "./ReviewCard"
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import fetchRequest from "../API/fetchRequestToOurDB"

export default function CatalogSection({ reviews }) {
    const navigate = useNavigate()
    const [reactionsMap, setReactionsMap] = useState({})

    useEffect(() => {
        async function loadReactions() {
            if (reviews.length === 0) return
            const ids = reviews.map(r => r.id).join(',')
            const reactionRows = await fetchRequest(`/Reactions?select=review_id,type&review_id=in.(${ids})`)
                .then(res => res.json())

            const map = {}
            reactionRows.forEach(row => {
                if (!map[row.review_id]) map[row.review_id] = {}
                map[row.review_id][row.type] = (map[row.review_id][row.type] || 0) + 1
            })
            setReactionsMap(map)
        }
        loadReactions()
    }, [reviews])

    function handleViewAllClick() {
        navigate('/Catalog')
    }

    return (
        <section className="section" id="catalog">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <h2>Recent reviews</h2>
                        <p>Pulled straight from the catalog — pros, cons, and what people actually clicked on.</p>
                    </div>
                    <a className="btn-ghost" onClick={handleViewAllClick}>View all</a>
                </div>

                <div className="review-grid">
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
                                <Link to={`/Catalog/${review.id}`} className="card-link">
                                    <ReviewCard {...review} reactions={reactionsMap[review.id] || {}} />
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}