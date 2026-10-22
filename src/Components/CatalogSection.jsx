import ReviewCard from "./ReviewCard";
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, } from "react-router";

export default function CatalogSection({ reviews }) {
    const navigate = useNavigate()


    function handleViewAllClick() {
        // Handle view all click logic here
        navigate('/Catalog');
    }

    return (
        <section className="section" id="catalog">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <h2>Recent reviews</h2>
                        <p>Pulled straight from the catalog — pros, cons, and what people actually clicked on.</p>
                    </div>
                    <a className="btn-ghost" onClick={handleViewAllClick}>
                        View all
                    </a>
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
                            ><Link to={`/Catalog/${review.id}`} className="card-link"><ReviewCard {...review} /></Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>

    )
}   