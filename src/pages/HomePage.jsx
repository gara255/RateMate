import HeroSection from '../Components/HeroSection'
import ReviewModal from '../Components/ReviewModal'
import StatSection from '../Components/StatSection'
import CatalogSection from '../Components/CatalogSection'
import HowSection from '../Components/HowSection'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router'
import fetchRequest from '../API/fetchRequestToOurDB'

export default function HomePage() {

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
            await fetchRequest('/Reviews', 'POST', review)
            const freshReviews = await fetchRequest('/Reviews?select=*&order=created_at.desc&limit=3')
                .then(response => response.json())

            setReviews(freshReviews)
            closeModalHandler()
        } catch (error) {
            alert(`Error adding review:${error.message}`);
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