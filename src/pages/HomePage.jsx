import HeroSection from '../Components/HeroSection'
import ReviewModal from '../Components/ReviewModal'
import StatSection from '../Components/StatSection'
import CatalogSection from '../Components/CatalogSection'
import HowSection from '../Components/HowSection'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import fetchRequest from '../API/fetchRequestToOurDB'
import useAuth from '../hooks/useAuth'

export default function HomePage() {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [showReviewModal, setShowReviewModal] = useState(false)

    useEffect(() => {
        async function loadRecentReviews() {
            setLoading(true)
            setLoadError('')
            try {
                const recentReviews = await fetchRequest('/Reviews?select=*&order=created_at.desc&limit=3')
                    .then(response => response.json())
                setReviews(recentReviews)
            } catch (error) {
                setLoadError("Couldn't load recent reviews. Please try again later.")
            } finally {
                setLoading(false)
            }
        }
        loadRecentReviews()
    }, [])

    const submitUserReview = async (review) => {
        try {
            const reviewWithAuthor = {
                ...review,
                author_id: auth?.user?.id ?? null,
                author_username: auth?.user?.user_metadata?.username ?? "Anonymous",
            }

            await fetchRequest('/Reviews', 'POST', reviewWithAuthor, null, auth?.access_token)
            const freshReviews = await fetchRequest('/Reviews?select=*&order=created_at.desc&limit=3')
                .then(response => response.json())

            setReviews(freshReviews)
            closeModalHandler()
        } catch (error) {
            alert(`Error adding review: ${error.message}`)
        }
    }

    const closeModalHandler = () => setShowReviewModal(false)

    const createReview = () => {
        if (!auth?.user) {
            navigate('/Register')
            return
        }
        setShowReviewModal(true)
    }

    return (
        <>
            <HeroSection onClick={createReview} />
            {showReviewModal && <ReviewModal onClose={closeModalHandler} onSubmit={submitUserReview} />}
            <StatSection />
            {loading && <p className="wrap">Loading reviews...</p>}
            {loadError && <p className="wrap" style={{ color: "var(--bad, #ff8b91)" }}>{loadError}</p>}
            {!loading && !loadError && <CatalogSection reviews={reviews} />}
            <HowSection />
        </>
    )
}