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
import getRecentReviews from './API/getRecentReviews'

const apiKey = 'sb_publishable_9qhBP--rQvNZ3G9lzPtYXg_qRRPpByS'

function App() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function loadReviews() {
            const data = await getRecentReviews()
            setReviews(data)
        }
        loadReviews()
    }, [])

    const submitUserReview = async (review) => {
        try {
            let response = await fetch('https://wuhbloysiszrtkjsigmo.supabase.co/rest/v1/Reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey

                },
                body: JSON.stringify(review),

            })
            if (!response.ok) {
                throw new Error(await response.text())
            }
            closeModalHandler()

        } catch (error) {
            alert(`Error adding review:${error.message}`);
        }
    }
    const navigate = useNavigate()
    const [showReviewModal, setShowReviewModal] = useState(false)
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
