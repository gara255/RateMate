import HeroSection from '../Components/HeroSection'
import ReviewModal from '../Components/ReviewModal'
import StatSection from '../Components/StatSection'
import CatalogSection from '../Components/CatalogSection'
import HowSection from '../Components/HowSection'
import { useState, useEffect } from "react";
import fetchRequest from '../API/fetchRequestToOurDB'
import useAuth from '../hooks/useAuth'

export default function HomePage() {
    const {auth} = useAuth
    const [reviews, setReviews] = useState([])
    const [showReviewModal, setShowReviewModal] = useState(false)

    useEffect(() => {
        async function loadRecentReviews() {
            let recentReviews = await fetchRequest('/Reviews?select=*&order=created_at.desc&limit=3')
                .then(response => response.json())
                .then(data => { return data })
            setReviews(recentReviews)
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

            await fetchRequest('/Reviews', 'POST', reviewWithAuthor)
            const freshReviews = await fetchRequest('/Reviews?select=*&order=created_at.desc&limit=3')
                .then(response => response.json())

            setReviews(freshReviews)
            closeModalHandler()
        } catch (error) {
            alert(`Error adding review:${error.message}`)
        }
    }

    const closeModalHandler = () => setShowReviewModal(false)
    const createReview = () => setShowReviewModal(true)

    return (
        <>
        
            <HeroSection onClick={createReview} />

            {showReviewModal && <ReviewModal onClose={closeModalHandler} onSubmit={submitUserReview} />}

            <StatSection />

            <CatalogSection reviews={reviews} />

            <HowSection />
        </>
    )
}