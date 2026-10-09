import { useState, useEffect } from 'react'
import '../styles.css'
import CatalogSection from './Components/CatalogSection'
import Footer from './Components/Footer'
import Header from './Components/Header'
import HeroSection from './Components/HeroSection'
import HowSection from './Components/HowSection'
import ReviewModal from './Components/ReviewModal'
import StatSection from './Components/StatSection'
import Test from './Components/Test'


const apiKey = 'sb_publishable_9qhBP--rQvNZ3G9lzPtYXg_qRRPpByS'
function App() {


    const submitUserReview = async (review) => {
        try {
            await fetch('https://wuhbloysiszrtkjsigmo.supabase.co/rest/v1/Reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                    
                },
                body: JSON.stringify(review)
            })
        } catch {
            alert('Error adding review: ' + error);
        } finally {
            closeModalHandler()
        }
    }

    const [showReviewModal, setShowReviewModal] = useState(false)
    const closeModalHandler = () => {
        setShowReviewModal(false)
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

            <CatalogSection />

            <HowSection />

            <Footer />


        </>

    )
}

export default App
