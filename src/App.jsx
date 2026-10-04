import { useState } from 'react'
import '../styles.css'
import CatalogSection from './Components/CatalogSection'
import Footer from './Components/Footer'
import Header from './Components/Header'
import HeroSection from './Components/HeroSection'
import HowSection from './Components/HowSection'
import ReviewModal from './Components/ReviewModal'
import StatSection from './Components/StatSection'

function App() {

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

            <HeroSection onClick = {createReview} />

            {showReviewModal && <ReviewModal onClose={closeModalHandler}/>}

            <StatSection />

            <CatalogSection />

            <HowSection />

            <Footer />


        </>

    )
    }

    export default App
