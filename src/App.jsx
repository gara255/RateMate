import { useState, useEffect } from 'react'
import '../styles.css'
import CatalogSection from './Components/CatalogSection'
import Footer from './Components/Footer'
import Header from './Components/Header'
import HeroSection from './Components/HeroSection'
import HowSection from './Components/HowSection'
import ReviewModal from './Components/ReviewModal'
import StatSection from './Components/StatSection'
import { useNavigate } from 'react-router'
import fetchRequest from './API/fetchRequest'

const apiKey = 'sb_publishable_9qhBP--rQvNZ3G9lzPtYXg_qRRPpByS'

function App() {

    const [reviews, setReviews] = useState([])
    const [showReviewModal, setShowReviewModal] = useState(false)
    const navigate = useNavigate()

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

    const closeModalHandler = () => {
        setShowReviewModal(false)
        navigate('/')
    }

    const createReview = () => {
        setShowReviewModal(true)
    }



    return (
        <>

            <Header />

            <HeroSection onClick={createReview} />

            {showReviewModal && <ReviewModal onClose={closeModalHandler} onSubmit={submitUserReview} />}

            <StatSection />

            <CatalogSection reviews={reviews} />

            <HowSection />

            <Footer />

        </>

    )
}

export default App
